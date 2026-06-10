// src/pages/Doa.jsx

import { useState, useEffect } from 'react';
import { dApi } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import { DoaItem } from '../components/DoaItem';
import { Skel, Pagination } from '../components/ui';
import { Footer } from '../components/layout/Footer';
import { Icons } from '../components/Icons';

export default function Doa() {
  const [doa, setDoa]       = useState([]);
  const [loading, setLd]    = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage]     = useState(1);
  const [meta, setMeta]     = useState({});
  const dq = useDebounce(search, 400);

  useEffect(() => {
    setLd(true);
    const params = { per_page: 50, page };
    if (dq) params.search = dq;
    dApi.getAll(params)
      .then(r => {
        setDoa(r.data.data || []);
        setMeta(r.data.meta || {});
        setLd(false);
      })
      .catch(() => setLd(false));
  }, [dq, page]);

  useEffect(() => { setPage(1); }, [dq]);

  const totalPages = meta.last_page || 1;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 'calc(var(--nav-h) + 32px) 24px 64px' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: 6 }}>Doa Harian</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '0.9rem' }}>
        {meta.total ? `${meta.total} doa tersedia` : 'Kumpulan doa sehari-hari yang diajarkan Rasulullah ﷺ'}
      </p>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 28 }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
          <Icons.Search size={16} color="var(--text-muted)" />
        </span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari doa..."
          style={{ width: '100%', padding: '11px 16px 11px 40px', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-sans)' }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e  => e.target.style.borderColor = 'var(--border)'}
        />
        {search && (
          <button onClick={() => setSearch('')} className="btn-float-sm"
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            <Icons.Close size={14} />
          </button>
        )}
      </div>

      {/* List */}
      {loading ? (
        <div style={{ display: 'grid', gap: 12 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ padding: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              <Skel w="40%" h={16} mb={12} />
              <Skel h={12} mb={6} />
              <Skel w="70%" h={12} />
            </div>
          ))}
        </div>
      ) : doa.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '60px 0' }}>Doa tidak ditemukan</p>
      ) : (
        <>
          <div style={{ display: 'grid', gap: 10, marginBottom: 32 }}>
            {doa.map(d => <DoaItem key={d.id} doa={d} />)}
          </div>
          {totalPages > 1 && (
            <Pagination
              current={page}
              total={totalPages}
              onChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          )}
        </>
      )}

      <Footer />
    </div>
  );
}
