// src/components/ui/index.jsx

import { useBookmark } from '../../hooks/useBookmark';
import { Icons } from '../Icons';

// ── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({ children, variant = 'accent' }) {
  const colors = {
    accent: { color: 'var(--accent)',       border: 'var(--accent-light)',       bg: 'var(--bg-overlay)' },
    green:  { color: 'var(--accent-green)', border: 'var(--accent-green-light)', bg: 'transparent' },
    muted:  { color: 'var(--text-muted)',   border: 'var(--border)',             bg: 'transparent' },
  };
  const c = colors[variant];
  return (
    <span style={{
      padding: '3px 11px', borderRadius: 20, fontSize: '0.72rem',
      fontWeight: 600, border: `1px solid ${c.border}`,
      color: c.color, background: c.bg, letterSpacing: '0.02em', whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
export function Skel({ w = '100%', h = 14, r = 6, mb = 0 }) {
  return (
    <div className="shimmer" style={{ width: w, height: h, borderRadius: r, marginBottom: mb }} />
  );
}

export function SkeletonCard() {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Skel w={36} h={36} r={8} />
        <div style={{ flex: 1 }}>
          <Skel w="45%" h={11} mb={8} />
          <Skel w="72%" h={16} />
        </div>
      </div>
      <Skel h={42} mb={14} />
      <Skel h={13} mb={7} />
      <Skel w="85%" h={13} mb={7} />
      <Skel w="60%" h={13} />
    </div>
  );
}

// ── Bookmark Button ───────────────────────────────────────────────────────────
export function BmBtn({ hadist, size = 22 }) {
  const { isBookmarked, toggle } = useBookmark();
  const active = isBookmarked(hadist.id);
  return (
    <button
      onClick={e => { e.preventDefault(); toggle(hadist); }}
      title={active ? 'Hapus favorit' : 'Simpan favorit'}
      className="btn-float-sm"
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        padding: 4, color: active ? 'var(--accent)' : 'var(--text-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <svg
        width={size} height={size} viewBox="0 0 24 24"
        fill={active ? 'var(--accent)' : 'none'}
        stroke={active ? 'var(--accent)' : 'var(--text-muted)'}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    </button>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
export function Pagination({ current, total, onChange }) {
  const pages = [];
  const delta = 2;
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    pages.push(i);
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
      <PgBtn disabled={current === 1} onClick={() => onChange(current - 1)}>‹</PgBtn>
      {pages[0] > 1 && (
        <>
          <PgBtn onClick={() => onChange(1)}>1</PgBtn>
          {pages[0] > 2 && <span style={{ color: 'var(--text-muted)', padding: '0 4px' }}>…</span>}
        </>
      )}
      {pages.map(p => (
        <PgBtn key={p} active={p === current} onClick={() => onChange(p)}>{p}</PgBtn>
      ))}
      {pages[pages.length - 1] < total && (
        <>
          {pages[pages.length - 1] < total - 1 && <span style={{ color: 'var(--text-muted)', padding: '0 4px' }}>…</span>}
          <PgBtn onClick={() => onChange(total)}>{total}</PgBtn>
        </>
      )}
      <PgBtn disabled={current === total} onClick={() => onChange(current + 1)}>›</PgBtn>
    </div>
  );
}

function PgBtn({ children, active, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={disabled ? '' : 'btn-float-sm'}
      style={{
        minWidth: 36, height: 36, borderRadius: 8, border: '1px solid',
        borderColor: active ? 'var(--accent)' : 'var(--border)',
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? '#fff' : disabled ? 'var(--text-muted)' : 'var(--text-secondary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: 500, fontSize: '0.875rem', fontFamily: 'var(--font-sans)',
        opacity: disabled ? 0.4 : 1, transition: 'all 0.18s',
      }}
    >
      {children}
    </button>
  );
}
