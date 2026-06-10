// src/pages/JadwalSholat.jsx

import { useState, useEffect, useRef } from 'react';
import { Footer } from '../components/layout/Footer';

const BASE   = 'https://api.myquran.com/v2/sholat';
const TODAY  = new Date();
const TAHUN  = TODAY.getFullYear();

const SHOLAT_KEYS  = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];
const BULAN_SHORT  = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const BULAN_FULL   = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const HARI         = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];

const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 1 7 7c0 4.5-7 13-7 13S5 13.5 5 9a7 7 0 0 1 7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);

const IconChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const SHOLAT_ICONS = {
  Subuh: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h1m16 0h1M12 3v1m-7.4 2.6.7.7m13.4-.7-.7.7"/>
      <path d="M9 17a3 3 0 1 1 6 0"/><path d="M3 21h18"/>
    </svg>
  ),
  Dzuhur: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  ),
  Ashar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h1m16 0h1M12 3v1m-7.4 2.6.7.7m13.4-.7-.7.7"/>
      <circle cx="12" cy="12" r="3"/><path d="M3 21h18"/>
    </svg>
  ),
  Maghrib: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h18M8 17a4 4 0 0 1 8 0"/>
      <path d="M12 3v2M4.22 5.22l1.42 1.42M19.78 5.22l-1.42 1.42"/>
    </svg>
  ),
  Isya: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
    </svg>
  ),
};

function getNextSholat(row) {
  if (!row) return null;
  const now  = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  for (const key of SHOLAT_KEYS) {
    const val = row[key.toLowerCase()];
    if (!val) continue;
    const [h, m] = val.split(':').map(Number);
    if (h * 60 + m > mins) return { key, time: val };
  }
  return null;
}

function getActiveSholat(row) {
  if (!row) return null;
  const now  = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  let last   = null;
  for (const key of SHOLAT_KEYS) {
    const val = row[key.toLowerCase()];
    if (!val) continue;
    const [h, m] = val.split(':').map(Number);
    if (h * 60 + m <= mins) last = key;
  }
  return last;
}

function Dropdown({ value, onChange, options, placeholder, disabled }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setSearch(''); } };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const filtered = options.filter(o =>
    o.lokasi.toLowerCase().includes(search.toLowerCase())
  );

  const selected = options.find(o => String(o.id) === String(value));

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => { if (!disabled) { setOpen(o => !o); setSearch(''); } }}
        style={{
          width: '100%', padding: '10px 14px',
          borderRadius: 'var(--radius)',
          border: `1px solid ${open ? 'var(--accent)' : 'var(--border)'}`,
          background: 'var(--bg-card)',
          color: selected ? 'var(--text-primary)' : 'var(--text-muted)',
          fontSize: '0.88rem', fontFamily: 'var(--font-serif)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.4 : 1,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          textAlign: 'left', transition: 'border 0.15s',
        }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected ? selected.lokasi : placeholder}
        </span>
        <IconChevron open={open} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 200,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border)' }}>
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari kota..."
              style={{
                width: '100%', padding: '7px 10px', borderRadius: 6,
                border: '1px solid var(--border)', background: 'var(--bg-overlay)',
                color: 'var(--text-primary)', fontSize: '0.83rem',
                fontFamily: 'var(--font-serif)', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ maxHeight: 220, overflowY: 'auto' }}>
            {filtered.length === 0 && (
              <p style={{ padding: '12px 14px', fontSize: '0.83rem', color: 'var(--text-muted)', fontFamily: 'var(--font-serif)' }}>Tidak ditemukan</p>
            )}
            {filtered.map(o => {
              const active = String(o.id) === String(value);
              return (
                <button key={o.id}
                  onClick={() => { onChange(String(o.id), o.lokasi); setOpen(false); setSearch(''); }}
                  style={{
                    width: '100%', padding: '10px 14px', textAlign: 'left',
                    background: active ? 'var(--bg-overlay)' : 'transparent',
                    color: active ? 'var(--accent)' : 'var(--text-primary)',
                    border: 'none', borderBottom: '1px solid var(--border)',
                    cursor: 'pointer', fontSize: '0.87rem',
                    fontFamily: 'var(--font-serif)',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-overlay)'}
                  onMouseLeave={e => e.currentTarget.style.background = active ? 'var(--bg-overlay)' : 'transparent'}
                >
                  {o.lokasi}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function JadwalSholat() {
  const [now, setNow]         = useState(new Date());
  const [kotaList, setKota]   = useState([]);
  const [selKota, setSelKota] = useState('');
  const [kotaNama, setKotaNama] = useState('');
  const [bulan, setBulan]     = useState(TODAY.getMonth() + 1);
  const [jadwal, setJadwal]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingKota, setLdK] = useState(true);
  const [error, setError]     = useState('');

  // Update jam setiap detik
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Ambil semua kota sekaligus
  useEffect(() => {
    setLdK(true);
    fetch(`${BASE}/kota/semua`)
      .then(r => r.json())
      .then(d => { setKota(d.data || []); setLdK(false); })
      .catch(() => setLdK(false));
  }, []);

  // Ambil jadwal sholat
  useEffect(() => {
    if (!selKota) return;
    setLoading(true); setError('');
    fetch(`${BASE}/jadwal/${selKota}/${TAHUN}/${bulan}`)
      .then(r => r.json())
      .then(d => {
        setJadwal(d.data?.jadwal || []);
        setLoading(false);
      })
      .catch(() => { setError('Gagal memuat jadwal.'); setLoading(false); });
  }, [selKota, bulan]);

  const todayRow     = jadwal[now.getDate() - 1];
  const nextSholat   = getNextSholat(todayRow);
  const activeSholat = getActiveSholat(todayRow);
  const isBulanIni   = bulan === now.getMonth() + 1;

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 'calc(var(--nav-h) + 40px) 24px 80px' }}>

      {/* HEADER */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-serif)' }}>
          {HARI[now.getDay()]}, {now.getDate()} {BULAN_FULL[now.getMonth()]} {TAHUN}
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 10 }}>
          Jadwal Sholat
        </h1>
        {kotaNama && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, background: 'var(--bg-overlay)', border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--accent)' }}><IconPin /></span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)' }}>{kotaNama}</span>
          </div>
        )}
      </div>

      {/* JAM + SHOLAT BERIKUTNYA */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '22px 26px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)', marginBottom: 4 }}>Waktu Sekarang</p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1, letterSpacing: 1 }}>
            {now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div>
        {nextSholat && isBulanIni && selKota && (
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)', marginBottom: 4 }}>Sholat Berikutnya</p>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 2 }}>{nextSholat.key}</p>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>{nextSholat.time}</p>
          </div>
        )}
      </div>

      {/* FILTER */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: 28 }}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)', display: 'block', marginBottom: 7 }}>Kota / Kabupaten</label>
          <Dropdown
            value={selKota}
            onChange={(id, nama) => { setSelKota(id); setKotaNama(nama); }}
            options={kotaList}
            placeholder={loadingKota ? 'Memuat daftar kota...' : '— Cari dan pilih kota —'}
            disabled={loadingKota}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)', display: 'block', marginBottom: 8 }}>Bulan</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {BULAN_SHORT.map((b, i) => {
              const on = bulan === i + 1;
              return (
                <button key={i} onClick={() => setBulan(i + 1)} style={{
                  padding: '5px 12px', borderRadius: 20,
                  border: `1px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
                  background: on ? 'var(--accent)' : 'transparent',
                  color: on ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.75rem', fontFamily: 'var(--font-serif)',
                  fontWeight: on ? 600 : 400,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>{b}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      {!selKota && (
        <div style={{ textAlign: 'center', padding: '56px 0' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--bg-overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: 'var(--text-muted)' }}>
            <IconPin />
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--text-muted)' }}>Pilih lokasi untuk melihat jadwal sholat</p>
        </div>
      )}

      {selKota && loading && (
        <div style={{ textAlign: 'center', padding: '48px 0' }}><div className="spinner" /></div>
      )}
      {error && (
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', padding: '40px 0' }}>{error}</p>
      )}

      {selKota && !loading && !error && jadwal.length > 0 && (
        <>
          {/* WAKTU SHOLAT HARI INI */}
          {isBulanIni && todayRow && (
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)', marginBottom: 12 }}>Hari Ini</p>
              <div style={{ display: 'grid', gap: 8 }}>
                {SHOLAT_KEYS.map(key => {
                  const active = activeSholat === key;
                  const isNext = nextSholat?.key === key && !active;
                  const val    = todayRow[key.toLowerCase()] || '-';
                  return (
                    <div key={key} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '14px 20px', borderRadius: 'var(--radius)',
                      background: active ? 'var(--bg-overlay)' : 'var(--bg-card)',
                      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                      transition: 'all 0.2s',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ color: active ? 'var(--accent)' : 'var(--text-muted)', display: 'flex' }}>{SHOLAT_ICONS[key]}</span>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: active ? 700 : 500, color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{key}</span>
                        {active && <span style={{ fontSize: '0.62rem', padding: '2px 8px', borderRadius: 20, background: 'var(--accent)', color: '#fff', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>Waktu ini</span>}
                        {isNext && <span style={{ fontSize: '0.62rem', padding: '2px 8px', borderRadius: 20, border: '1px solid var(--accent)', color: 'var(--accent)', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>Berikutnya</span>}
                      </div>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: active ? 'var(--accent)' : 'var(--text-primary)' }}>{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TABEL BULANAN */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, marginBottom: 2 }}>
                  {BULAN_FULL[bulan - 1]} {TAHUN}
                </h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-serif)' }}>{kotaNama}</p>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-serif)' }}>
                {jadwal.length} hari
              </span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-overlay)' }}>
                    {['Tgl','Hari','Imsak','Subuh','Dzuhur','Ashar','Maghrib','Isya'].map(h => (
                      <th key={h} style={{ padding: '9px 12px', textAlign: ['Tgl','Hari'].includes(h) ? 'left' : 'center', fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', borderBottom: '1px solid var(--border)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jadwal.map((row, i) => {
                    const tgl      = i + 1;
                    const isToday  = isBulanIni && tgl === now.getDate();
                    const tglDate  = row.tanggal ? new Date(row.tanggal) : null;
                    const hariNama = tglDate ? HARI[tglDate.getDay()] : '-';
                    return (
                      <tr key={i} style={{ background: isToday ? 'var(--bg-overlay)' : 'transparent', borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '9px 12px', fontFamily: 'var(--font-serif)', fontWeight: isToday ? 700 : 400, color: isToday ? 'var(--accent)' : 'var(--text-primary)' }}>{tgl}</td>
                        <td style={{ padding: '9px 12px', fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', fontWeight: isToday ? 600 : 400 }}>{hariNama}</td>
                        {['imsak','subuh','dzuhur','ashar','maghrib','isya'].map(k => (
                          <td key={k} style={{ padding: '9px 12px', textAlign: 'center', fontFamily: 'var(--font-serif)', color: isToday ? 'var(--accent)' : 'var(--text-primary)', fontWeight: isToday ? 600 : 400 }}>
                            {row[k] || '-'}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
