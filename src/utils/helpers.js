// src/utils/helpers.js

// ── Highlight search keyword ──────────────────────────────────────────────────
export function hl(text, q) {
  if (!q || !text) return text;
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${esc})`, 'gi'), '<mark class="hl">$1</mark>');
}

// ── Load jsPDF dynamically ────────────────────────────────────────────────────
export async function loadJsPDF() {
  if (window.jspdf) return window.jspdf.jsPDF;
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return window.jspdf.jsPDF;
}

/**
 * Render Arabic text onto an offscreen canvas → PNG data URL.
 * Bypasses jsPDF's lack of Arabic/RTL font support.
 */
export function renderArabicToImage(arabicText, pdfWidthMm, opts = {}) {
  const {
    fontSize   = 32,
    lineHeight = 1.9,
    fontFamily = "'Scheherazade New', 'Amiri', 'Arial', serif",
    textColor  = '#1A3A2A',
    bgColor    = 'transparent',
    paddingPx  = 24,
    maxWidthPx = 1200,
  } = opts;

  // 1. measure & wrap lines
  const measureCanvas = document.createElement('canvas');
  const mCtx = measureCanvas.getContext('2d');
  mCtx.font = `${fontSize}px ${fontFamily}`;

  const words = arabicText.split(' ');
  const lines = [];
  let current = '';
  const maxW = maxWidthPx - paddingPx * 2;

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (mCtx.measureText(test).width > maxW && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);

  // 2. size the real canvas
  const lineH   = fontSize * lineHeight;
  const canvasW = maxWidthPx;
  const canvasH = Math.ceil(lines.length * lineH + paddingPx * 2);

  const canvas = document.createElement('canvas');
  canvas.width  = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');

  if (bgColor === 'transparent') {
    ctx.clearRect(0, 0, canvasW, canvasH);
  } else {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasW, canvasH);
  }

  // 3. draw each line RTL
  ctx.font      = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = textColor;
  ctx.direction = 'rtl';
  ctx.textAlign = 'right';

  lines.forEach((line, i) => {
    const y = paddingPx + (i + 1) * lineH - (lineH - fontSize) / 2;
    ctx.fillText(line, canvasW - paddingPx, y);
  });

  // 4. convert to jsPDF dimensions
  const pxPerMm  = canvasW / pdfWidthMm;
  const heightMm = canvasH / pxPerMm;

  return {
    dataUrl  : canvas.toDataURL('image/png'),
    widthMm  : pdfWidthMm,
    heightMm : heightMm,
  };
}
