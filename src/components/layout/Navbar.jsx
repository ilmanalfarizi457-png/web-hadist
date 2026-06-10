// src/components/layout/Navbar.jsx

import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Icons } from '../Icons';
import { useTheme } from '../../context/ThemeContext';

const NAV_ITEMS = [
  { to: '/',        label: 'Beranda',       icon: 'Beranda', end: true },
  { to: '/hadist',  label: 'Hadist',        icon: 'Hadist' },
  { to: '/doa',     label: 'Doa',           icon: 'Doa' },
  { to: '/sholat',  label: 'Jadwal Sholat', icon: 'Sholat' },
  { to: '/tentang', label: 'Tentang',       icon: 'Tentang' },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinkStyle = ({ isActive }) => ({
    padding: '6px 13px', borderRadius: 8,
    textDecoration: 'none', fontSize: '0.86rem', fontWeight: 500,
    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
    background: isActive ? 'var(--bg-overlay)' : 'transparent',
    transition: 'all 0.18s',
    whiteSpace: 'nowrap',
    display: 'flex', alignItems: 'center', gap: 6,
  });

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: 'var(--nav-h)',
      background: scrolled
        ? (theme === 'dark' ? 'rgba(25,20,13,0.92)' : 'rgba(253,250,245,0.92)')
        : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', height: '100%', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
<Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: 10, flexShrink: 0 }}>
    <rect width="36" height="36" rx="10" fill="url(#logoGrad)"/>
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#B5773A"/>
        <stop offset="100%" stopColor="#7A4A1A"/>
      </linearGradient>
    </defs>
    {/* Bulan sabit */}
    <circle cx="17" cy="16" r="9" fill="#F5E6C8"/>
    <circle cx="20.5" cy="13.5" r="7.5" fill="#8B5020"/>
    {/* Bintang kecil */}
    <polygon points="24,11 24.6,12.8 26.5,12.8 25,13.9 25.5,15.7 24,14.6 22.5,15.7 23,13.9 21.5,12.8 23.4,12.8"
      fill="#F5E6C8"/>
  </svg>
  <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.08rem', color: 'var(--text-primary)' }}>
    Hadist Ilmi
  </span>
</Link>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_ITEMS.map(n => {
            const IconComp = Icons[n.icon];
            return (
              <NavLink key={n.to} to={n.to} end={n.end} style={navLinkStyle}
                onMouseEnter={e => { if (!e.currentTarget.style.background.includes('overlay')) e.currentTarget.style.background = 'var(--bg-secondary)'; }}
                onMouseLeave={e => { if (!e.currentTarget.getAttribute('data-active')) e.currentTarget.style.background = 'transparent'; }}
              >
                {({ isActive }) => (
                  <>
                    <span style={{ opacity: isActive ? 1 : 0.7, display: 'flex' }}>
                      <IconComp size={15} color={isActive ? 'var(--accent)' : 'var(--text-secondary)'} />
                    </span>
                    {n.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link to="/favorit" title="Favorit" className="btn-float-sm"
            style={{ width: 34, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', color: 'var(--accent)', textDecoration: 'none', background: 'transparent' }}>
            <Icons.Favorit size={16} color="var(--accent)" />
          </Link>

          <button onClick={toggle} title="Ganti tema" className="btn-float-sm"
            style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {theme === 'light'
              ? <Icons.Moon size={15} color="var(--text-secondary)" />
              : <Icons.Sun size={15} color="var(--text-secondary)" />}
          </button>

          <button className="show-mobile btn-float-sm"
            onClick={() => setOpen(o => !o)}
            style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text-primary)', alignItems: 'center', justifyContent: 'center' }}>
            {open ? <Icons.Close size={16} /> : <Icons.Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', padding: '8px 16px 16px', boxShadow: 'var(--shadow-md)' }}>
          {NAV_ITEMS.map(n => {
            const IconComp = Icons[n.icon];
            return (
              <NavLink key={n.to} to={n.to} end={n.end}
                onClick={() => setOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '11px 14px', borderRadius: 8, textDecoration: 'none',
                  fontSize: '0.92rem', fontWeight: 500,
                  color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                  background: isActive ? 'var(--bg-overlay)' : 'transparent',
                  marginBottom: 2,
                })}>
                {({ isActive }) => (
                  <>
                    <IconComp size={16} color={isActive ? 'var(--accent)' : 'var(--text-secondary)'} />
                    {n.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      )}
    </nav>
  );
}
