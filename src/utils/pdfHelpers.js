// src/utils/pdfHelpers.js

import { loadJsPDF, renderArabicToImage } from './helpers';

// ── Download PDF untuk halaman Doa ───────────────────────────────────────────
export async function downloadDoaPDF(doa) {
  const jsPDF = await loadJsPDF();
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const margin = 20;
  const usable = W - margin * 2;
  let y = 0;

  // Header bar
  doc.setFillColor(181, 119, 58);
  doc.rect(0, 0, W, 42, 'F');
  doc.setFillColor(122, 79, 30);
  doc.circle(margin + 9, 21, 9, 'F');
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('\u062D', margin + 9, 24, { align: 'center' });
  doc.setFontSize(17);
  doc.text('Hadist Ilmi', margin + 22, 18);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(240, 215, 170);
  doc.text('Kumpulan Doa Harian', margin + 22, 26);

  // Badge "DOA"
  doc.setFillColor(122, 79, 30);
  doc.roundedRect(W - margin - 24, 10, 24, 22, 4, 4, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('DOA', W - margin - 12, 23, { align: 'center' });

  y = 54;

  // Judul doa
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(44, 36, 22);
  const judulLines = doc.splitTextToSize(doa.judul || 'Doa', usable);
  doc.text(judulLines, margin, y);
  y += judulLines.length * 8 + 4;

  // Garis
  doc.setDrawColor(220, 200, 160);
  doc.setLineWidth(0.4);
  doc.line(margin, y, W - margin, y);
  y += 10;

  // Arab via canvas
  if (doa.arab) {
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(158, 139, 108);

    const arabImg = renderArabicToImage(doa.arab, usable - 8, {
      fontSize: 36, lineHeight: 2.0, textColor: '#1A3A2A', bgColor: 'transparent',
    });

    const boxPadTop    = 14;
    const boxPadBottom = 10;
    const arabBoxH     = arabImg.heightMm + boxPadTop + boxPadBottom + 6;

    if (y + arabBoxH > H - 30) { doc.addPage(); y = margin; }

    doc.setFillColor(245, 239, 224);
    doc.roundedRect(margin, y, usable, arabBoxH, 5, 5, 'F');
    doc.setFillColor(181, 119, 58);
    doc.rect(margin, y, 3.5, arabBoxH, 'F');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(158, 139, 108);
    doc.text('TEKS ARAB', margin + 7, y + 7);

    doc.addImage(arabImg.dataUrl, 'PNG', margin + 4, y + boxPadTop, arabImg.widthMm, arabImg.heightMm);
    y += arabBoxH + 10;
  }

  // Latin
  if (doa.latin) {
    if (y + 16 > H - 30) { doc.addPage(); y = margin; }
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(158, 139, 108);
    doc.text('LATIN', margin, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(181, 119, 58);
    const latinLines = doc.splitTextToSize(doa.latin, usable);
    doc.text(latinLines, margin, y);
    y += latinLines.length * 6 + 8;
  }

  // Terjemahan
  if (doa.terjemahan) {
    if (y + 16 > H - 30) { doc.addPage(); y = margin; }
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(158, 139, 108);
    doc.text('TERJEMAHAN', margin, y);
    y += 6;
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 91, 62);
    const terjLines = doc.splitTextToSize(`"${doa.terjemahan}"`, usable);
    doc.text(terjLines, margin, y);
  }

  // Footer
  const fY = H - 14;
  doc.setFillColor(245, 239, 224);
  doc.rect(0, fY - 8, W, 22, 'F');
  doc.setDrawColor(220, 200, 160);
  doc.setLineWidth(0.3);
  doc.line(0, fY - 8, W, fY - 8);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(158, 139, 108);
  doc.text('Bismillahirrahmanirrahim', W / 2, fY - 1, { align: 'center' });
  doc.text(`© ${new Date().getFullYear()} Hadist Ilmi — Doa Harian`, W / 2, fY + 5, { align: 'center' });

  const filename = `doa-${(doa.judul || 'doa').slice(0, 30).replace(/\s+/g, '-')}.pdf`;
  doc.save(filename);
}

// ── Download PDF untuk halaman Hadist Detail ─────────────────────────────────
export async function downloadHadistPDF(h) {
  const jsPDF = await loadJsPDF();
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const margin = 20;
  const usable = W - margin * 2;
  let y = 0;

  // Header
  doc.setFillColor(181, 119, 58);
  doc.rect(0, 0, W, 42, 'F');
  doc.setFillColor(122, 79, 30);
  doc.circle(margin + 9, 21, 9, 'F');
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('\u062D', margin + 9, 24, { align: 'center' });
  doc.setFontSize(17);
  doc.text('Hadist Ilmi', margin + 22, 18);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(240, 215, 170);
  doc.text('Platform Hadist Digital Berbahasa Indonesia', margin + 22, 26);
  doc.setFillColor(122, 79, 30);
  doc.roundedRect(W - margin - 24, 10, 24, 22, 4, 4, 'F');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(`#${h.nomor}`, W - margin - 12, 23, { align: 'center' });

  y = 52;

  // Badges kitab & kategori
  const kitabLabel = h.kitab?.nama || 'Kitab';
  doc.setFillColor(237, 228, 206);
  const kitabW = doc.getStringUnitWidth(kitabLabel) * 8.5 / doc.internal.scaleFactor + 8;
  doc.roundedRect(margin, y - 4, kitabW, 8, 2, 2, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(181, 119, 58);
  doc.text(kitabLabel, margin + 4, y + 1.5);

  const katLabel = h.kategori?.nama || h.kategori || '';
  if (katLabel) {
    const katX = margin + kitabW + 4;
    const katW = doc.getStringUnitWidth(katLabel) * 8.5 / doc.internal.scaleFactor + 8;
    doc.setFillColor(209, 233, 218);
    doc.roundedRect(katX, y - 4, katW, 8, 2, 2, 'F');
    doc.setTextColor(45, 106, 79);
    doc.text(katLabel, katX + 4, y + 1.5);
  }
  y += 12;

  // Judul
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(44, 36, 22);
  const judulLines = doc.splitTextToSize(h.judul || '', usable);
  doc.text(judulLines, margin, y);
  y += judulLines.length * 7 + 6;

  // Garis
  doc.setDrawColor(220, 200, 160);
  doc.setLineWidth(0.4);
  doc.line(margin, y, W - margin, y);
  y += 8;

  // Arab via canvas
  if (h.arab) {
    const arabImg = renderArabicToImage(h.arab, usable - 8, {
      fontSize: 36, lineHeight: 2.0, textColor: '#1A3A2A', bgColor: 'transparent',
    });

    const boxPadTop    = 14;
    const boxPadBottom = 10;
    const arabBoxH     = arabImg.heightMm + boxPadTop + boxPadBottom + 6;

    if (y + arabBoxH > H - 30) { doc.addPage(); y = margin; }

    doc.setFillColor(245, 239, 224);
    doc.roundedRect(margin, y, usable, arabBoxH, 5, 5, 'F');
    doc.setFillColor(181, 119, 58);
    doc.rect(margin, y, 3.5, arabBoxH, 'F');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(158, 139, 108);
    doc.text('TEKS ARAB', margin + 7, y + 7);

    doc.addImage(arabImg.dataUrl, 'PNG', margin + 4, y + boxPadTop, arabImg.widthMm, arabImg.heightMm);
    y += arabBoxH + 10;
  }

  // Terjemahan
  if (y + 20 > H - 30) { doc.addPage(); y = margin; }
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(158, 139, 108);
  doc.text('TERJEMAHAN', margin, y);
  y += 6;
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 91, 62);
  const terjLines = doc.splitTextToSize(h.terjemahan || '', usable);
  if (y + terjLines.length * 6 > H - 30) { doc.addPage(); y = margin; }
  doc.text(terjLines, margin, y);
  y += terjLines.length * 6 + 8;

  // Perawi
  if (h.perawi) {
    if (y + 12 > H - 30) { doc.addPage(); y = margin; }
    doc.setDrawColor(220, 200, 160);
    doc.line(margin, y, W - margin, y);
    y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(158, 139, 108);
    doc.text(`Diriwayatkan oleh: ${h.perawi}`, margin, y);
  }

  // Footer
  const fY = H - 14;
  doc.setFillColor(245, 239, 224);
  doc.rect(0, fY - 8, W, 22, 'F');
  doc.setDrawColor(220, 200, 160);
  doc.setLineWidth(0.3);
  doc.line(0, fY - 8, W, fY - 8);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(158, 139, 108);
  doc.text('Bismillahirrahmanirrahim', W / 2, fY - 1, { align: 'center' });
  doc.text(`© ${new Date().getFullYear()} Hadist Ilmi  •  ${h.kitab?.nama || ''} No. ${h.nomor}`, W / 2, fY + 5, { align: 'center' });

  const filename = `hadist-${h.nomor}-${(h.judul || 'hadist').slice(0, 30).replace(/\s+/g, '-')}.pdf`;
  doc.save(filename);
}
