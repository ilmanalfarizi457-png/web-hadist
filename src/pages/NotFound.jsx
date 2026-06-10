// src/pages/NotFound.jsx

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', padding: 'calc(var(--nav-h) + 80px) 24px' }}>
      <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '3rem', color: 'var(--accent)', marginBottom: 16 }}>٤٠٤</p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: 10 }}>Halaman Tidak Ditemukan</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
      <Link to="/" className="btn-primary-float"
        style={{ padding: '11px 28px', borderRadius: 10, background: 'var(--accent)', color: '#fff', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(181,119,58,0.4)' }}>
        ← Kembali ke Beranda
      </Link>
    </div>
  );
}
