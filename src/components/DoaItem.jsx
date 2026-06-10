// src/components/DoaItem.jsx

import { useState } from 'react';
import { Icons } from './Icons';
import { actionBtnStyle } from '../utils/styleConstants';
import { downloadDoaPDF } from '../utils/pdfHelpers';

export function DoaItem({ doa, defaultOpen = false }) {
  const [open, setOpen]        = useState(defaultOpen);
  const [copied, setCopied]    = useState(false);
  const [pdfLoading, setPdfLd] = useState(false);

  const copyText = () => {
    const text = `${doa.judul}\n\n${doa.arab || ''}\n\n${doa.latin || ''}\n\n"${doa.terjemahan || ''}"`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareWA = () => {
    const text = `*${doa.judul}*\n\n${doa.arab || ''}\n\n_${doa.latin || ''}_\n\n"${doa.terjemahan || ''}"\n\n📖 via Hadist Ilmi`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePDF = async () => {
    if (pdfLoading) return;
    setPdfLd(true);
    try {
      await downloadDoaPDF(doa);
    } catch (err) {
      console.error('PDF error:', err);
      alert('Gagal membuat PDF. Pastikan koneksi internet aktif.');
    } finally {
      setPdfLd(false);
    }
  };

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', overflow: 'hidden',
      transition: 'box-shadow 0.2s',
      boxShadow: open ? 'var(--shadow-md)' : 'var(--shadow)',
    }}>
      {/* Accordion header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="btn-float-sm"
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '16px 20px',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', textAlign: 'left' }}>
          {doa.judul}
        </span>
        <span style={{
          color: 'var(--accent)', display: 'flex', flexShrink: 0, marginLeft: 12,
          transition: 'transform 0.25s ease',
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
        }}>
          <Icons.ChevronDown size={16} />
        </span>
      </button>

      {/* Content */}
      {open && (
        <div className="fade-up" style={{ padding: '0 20px 20px', borderTop: '1px solid var(--border)' }}>
          {doa.arab && (
            <div style={{
              background: 'var(--bg-overlay)', borderRadius: 10,
              padding: '16px 20px', margin: '16px 0 12px',
              borderRight: '3px solid var(--accent)',
            }}>
              <p className="arabic-text" style={{ fontSize: '1.3rem' }}>{doa.arab}</p>
            </div>
          )}
          {doa.latin && (
            <p style={{ fontSize: '0.88rem', color: 'var(--accent)', fontStyle: 'italic', marginBottom: 10, lineHeight: 1.7 }}>
              {doa.latin}
            </p>
          )}
          {doa.terjemahan && (
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 16 }}>
              "{doa.terjemahan}"
            </p>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <button onClick={copyText} className="btn-float" style={actionBtnStyle}>
              {copied
                ? <Icons.Check size={13} color="var(--accent-green)" />
                : <Icons.Copy size={13} />}
              {copied ? 'Tersalin' : 'Salin Doa'}
            </button>
            <button onClick={shareWA} className="btn-float" style={actionBtnStyle}>
              <Icons.Share size={13} /> Bagikan
            </button>
            <button
              onClick={handlePDF}
              disabled={pdfLoading}
              className="btn-float"
              style={{ ...actionBtnStyle, opacity: pdfLoading ? 0.6 : 1, cursor: pdfLoading ? 'wait' : 'pointer' }}
            >
              <Icons.Download size={13} />
              {pdfLoading ? 'Membuat PDF...' : 'Unduh PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
