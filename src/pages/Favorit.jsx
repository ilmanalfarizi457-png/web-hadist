// src/pages/Favorit.jsx

import { Link } from 'react-router-dom';
import { useBookmark } from '../hooks/useBookmark';
import { HadistCard } from '../components/HadistCard';
import { Footer } from '../components/layout/Footer';
import { Icons } from '../components/Icons';

export default function Favorit() {
  const { bookmarks, toggle } = useBookmark();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 'calc(var(--nav-h) + 32px) 24px 64px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: 6 }}>Hadist Favorit</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{bookmarks.length} hadist tersimpan</p>
      </div>

      {bookmarks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 52, marginBottom: 16, opacity: 0.5 }}>
            <Icons.Favorit size={52} color="var(--text-muted)" />
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Belum ada hadist favorit</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 24 }}>Tekan ♡ pada hadist mana saja untuk menyimpannya di sini</p>
          <Link to="/hadist" className="btn-primary-float"
            style={{ padding: '10px 24px', borderRadius: 10, background: 'var(--accent)', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(181,119,58,0.4)' }}>
            <Icons.Hadist size={15} color="#fff" /> Jelajahi Hadist
          </Link>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button className="btn-float-sm"
              onClick={() => { if (confirm('Hapus semua favorit?')) bookmarks.forEach(b => toggle(b)); }}
              style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
              Hapus semua
            </button>
          </div>
          <div style={{ display: 'grid', gap: 18 }}>
            {bookmarks.map(h => <HadistCard key={h.id} hadist={h} />)}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
