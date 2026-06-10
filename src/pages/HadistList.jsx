// src/pages/HadistList.jsx

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { hApi, kApi, kbApi } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import { HadistCard } from '../components/HadistCard';
import { SkeletonCard, Pagination } from '../components/ui';
import { Footer } from '../components/layout/Footer';
import { Icons } from '../components/Icons';

function SideSection({ title, children }) {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 14, marginBottom: 14 }}>
      <h3 style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>{title}</h3>
      {children}
    </div>
  );
}

export default function HadistList() {
  const [sp, setSp]           = useSearchParams();
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta]       = useState({});
  const [kategori, setKat]    = useState([]);
  const [kitabList, setKitab] = useState([]);
  const [search, setSearch]   = useState(sp.get('q') || '');
  const [selKat, setSelKat]   = useState(sp.get('kategori')?.split(',').filter(Boolean) || []);
  const [selKitab, setSelKb]  = useState(sp.get('kitab') || '');
  const [page, setPage]       = useState(Number(sp.get('page')) || 1);
  const dq = useDebounce(search);

  useEffect(() => {
    Promise.all([kApi.getAll(), kbApi.getAll()]).then(([k, kb]) => {
      setKat(k.data.data || k.data || []);
      setKitab(kb.data.data || kb.data || []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {
      page, per_page: 12,
      ...(dq && { search: dq }),
      ...(selKat.length && { kategori: selKat.join(',') }),
      ...(selKitab && { kitab: selKitab }),
    };
    hApi.getAll(params).then(res => {
      setItems(res.data.data || []);
      setMeta(res.data.meta || {});
      setLoading(false);
    }).catch(() => setLoading(false));

    const p = new URLSearchParams();
    if (dq) p.set('q', dq);
    if (selKat.length) p.set('kategori', selKat.join(','));
    if (selKitab) p.set('kitab', selKitab);
    if (page > 1) p.set('page', page);
    setSp(p, { replace: true });
  }, [dq, selKat, selKitab, page]);

  const toggleKat = id => {
    setSelKat(prev => prev.includes(String(id)) ? prev.filter(k => k !== String(id)) : [...prev, String(id)]);
    setPage(1);
  };

  const filterBtn = active => ({
    display: 'block', width: '100%', textAlign: 'left',
    padding: '7px 10px', borderRadius: 7, border: 'none',
    background: active ? 'var(--bg-overlay)' : 'transparent',
    color: active ? 'var(--accent)' : 'var(--text-secondary)',
    fontWeight: active ? 600 : 400,
    fontFamily: 'var(--font-sans)', fontSize: '0.865rem',
    cursor: 'pointer', marginBottom: 2,
    transition: 'all 0.18s, transform 0.2s cubic-bezier(.34,1.56,.64,1)',
  });

  const totalPages = meta.last_page || 1;

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'calc(var(--nav-h) + 32px) 24px 64px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: 6 }}>Koleksi Hadist</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {meta.total ? `${meta.total.toLocaleString('id-ID')} hadist tersedia` : '...'}
        </p>
      </div>

      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: 28 }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none', display: 'flex' }}>
          <Icons.Search size={16} color="var(--text-muted)" />
        </span>
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Cari hadist, terjemahan, atau kata kunci..."
          style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s' }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e  => e.target.style.borderColor = 'var(--border)'}
        />
        {search && (
          <button onClick={() => { setSearch(''); setPage(1); }} className="btn-float-sm"
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            <Icons.Close size={14} />
          </button>
        )}
      </div>

      {/* Grid: sidebar + main */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,220px) minmax(0,1fr)', gap: 28 }} className="hadist-grid">
        <aside>
          <SideSection title="Kitab">
            <button onClick={() => { setSelKb(''); setPage(1); }} className="btn-float-sm" style={filterBtn(!selKitab)}>Semua Kitab</button>
            {kitabList.map(k => (
              <button key={k.id} onClick={() => { setSelKb(String(k.id)); setPage(1); }} className="btn-float-sm" style={filterBtn(selKitab === String(k.id))}>
                {k.nama}
              </button>
            ))}
          </SideSection>

          <SideSection title="Kategori">
            {kategori.map(k => (
              <label key={k.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', cursor: 'pointer', fontSize: '0.865rem', color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={selKat.includes(String(k.id))} onChange={() => toggleKat(k.id)} style={{ accentColor: 'var(--accent)', cursor: 'pointer' }} />
                {k.nama}
              </label>
            ))}
          </SideSection>
        </aside>

        <main>
          {loading ? (
            <div style={{ display: 'grid', gap: 18 }}>
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>🔍</div>
              <p style={{ fontSize: '1.05rem', marginBottom: 6 }}>Hadist tidak ditemukan</p>
              <p style={{ fontSize: '0.85rem' }}>Coba kata kunci lain atau hapus filter</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gap: 18, marginBottom: 36 }}>
                {items.map((h, i) => (
                  <div key={h.id} style={{ animationDelay: `${i * 0.05}s` }}>
                    <HadistCard hadist={h} q={dq} />
                  </div>
                ))}
              </div>
              {totalPages > 1 && <Pagination current={page} total={totalPages} onChange={setPage} />}
            </>
          )}
        </main>
      </div>

      <Footer />
      <style>{`@media (max-width:640px) { .hadist-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
