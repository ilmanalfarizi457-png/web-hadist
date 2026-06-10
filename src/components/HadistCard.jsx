// src/components/HadistCard.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, BmBtn } from './ui';
import { hl } from '../utils/helpers';

export function HadistCard({ hadist, q = '' }) {
  const [hov, setHov] = useState(false);

  return (
    <article
      className="fade-up"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: 24,
        boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow)',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <span style={{
            flexShrink: 0, width: 38, height: 38, borderRadius: 9,
            background: 'var(--bg-overlay)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)',
          }}>
            #{hadist.nomor}
          </span>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: 2 }}>
              {hadist.kitab?.nama || hadist.kitab || '—'}
            </p>
            <Link
              to={`/hadist/${hadist.id}`}
              style={{ textDecoration: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.98rem', lineHeight: 1.4, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              dangerouslySetInnerHTML={{ __html: hl(hadist.judul, q) }}
            />
          </div>
        </div>
        <BmBtn hadist={hadist} />
      </div>

      <div style={{ background: 'var(--bg-overlay)', borderRadius: 10, padding: '16px 20px', marginBottom: 14, borderRight: '3px solid var(--accent)' }}>
        <p className="arabic-text" style={{ fontSize: '1.4rem' }}>
          {hadist.arab?.slice(0, 200)}{hadist.arab?.length > 200 ? '...' : ''}
        </p>
      </div>

      <p
        style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        dangerouslySetInnerHTML={{ __html: hl(hadist.terjemahan, q) }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        <Badge>{hadist.kategori?.nama || hadist.kategori || '—'}</Badge>
        <Link
          to={`/hadist/${hadist.id}`}
          className="btn-float-sm"
          style={{ textDecoration: 'none', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}
        >
          Baca →
        </Link>
      </div>
    </article>
  );
}
