// src/pages/Beranda.jsx

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { hApi, kApi, kbApi, dApi } from '../services/api';
import { Footer } from '../components/layout/Footer';
import { DoaItem } from '../components/DoaItem';
import { Icons } from '../components/Icons';
import { Skel } from '../components/ui';

function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        observer.disconnect();
        const start = performance.now();
        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
        const step = now => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.round(easeOutQuart(progress) * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCard({ label, target }) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 12px', boxShadow: 'var(--shadow)' }}>
      <p style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-serif)' }}>
        {target === 0 ? '—' : count.toLocaleString()}
      </p>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>{label}</p>
    </div>
  );
}

export default function Beranda() {
  const [stats, setStats]           = useState({ hadist: 0, kategori: 0, kitab: 0 });
  const [doaPreview, setDoaPreview] = useState([]);
  const [doaLoading, setDoaLoading] = useState(true);

  useEffect(() => {
    Promise.all([hApi.getAll({ per_page: 1 }), kApi.getAll(), kbApi.getAll()])
      .then(([h, k, kb]) => {
        setStats({
          hadist:   h.data.meta?.total || 0,
          kategori: (k.data.data || k.data).length,
          kitab:    (kb.data.data || kb.data).length,
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    dApi.getAll({ per_page: 6, page: 1 })
      .then(r => {
        setDoaPreview(r.data.data || []);
        setDoaLoading(false);
      })
      .catch(() => setDoaLoading(false));
  }, []);

  const fiturList = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
          <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
          <path d="M3 6v13" /><path d="M12 6v13" /><path d="M21 6v13" />
        </svg>
      ),
      title: 'Koleksi Lengkap',
      desc: 'Hadist dari berbagai kitab dengan sanad yang jelas.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
      ),
      title: 'Cari Cepat',
      desc: 'Pencarian real-time dengan highlight kata kunci.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
      ),
      title: 'Simpan Favorit',
      desc: 'Bookmark hadist favorit, tersimpan di perangkat.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
          <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
          <path d="M9.7 17l4.6 0" />
        </svg>
      ),
      title: 'Jadwal Sholat',
      desc: 'Waktu sholat akurat berdasarkan lokasi kamu.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
        </svg>
      ),
      title: 'Dark Mode',
      desc: 'Nyaman dibaca siang maupun malam hari.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
          <path d="M11 4h2" />
          <path d="M12 17v.01" />
        </svg>
      ),
      title: 'Ramah Mobile',
      desc: 'Tampilan optimal di semua ukuran layar.',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center',
        padding: '120px 24px 80px',
        background: `radial-gradient(ellipse 70% 60% at 50% 0%, rgba(181,119,58,0.12) 0%, transparent 70%)`,
      }}>
        <div style={{ maxWidth: 700 }}>
          <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '2rem', color: 'var(--accent)', marginBottom: 16, lineHeight: 1.8 }}>
            اطْلُبُوا الْعِلْمَ مِنَ الْمَهْدِ إِلَى اللَّحْد
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 40 }}>
            "Tuntutlah ilmu dari buaian hingga liang lahat"
          </p>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 600, lineHeight: 1.2, marginBottom: 20, color: 'var(--text-primary)' }}>
            Temukan Cahaya<br />
            <span style={{ color: 'var(--accent)' }}>Hadist Nabi ﷺ</span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 48, maxWidth: 520, margin: '0 auto 48px' }}>
            Kumpulan hadist shahih dengan terjemahan bahasa Indonesia yang mudah dipahami. Belajar, simpan, dan amalkan.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/hadist" className="btn-primary-float"
              style={{ padding: '13px 32px', borderRadius: 10, background: 'var(--accent)', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(181,119,58,0.4)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Icons.Hadist size={17} color="#fff" />
              Jelajahi Hadist
            </Link>
            <Link to="/sholat" className="btn-float"
              style={{ padding: '13px 32px', borderRadius: 10, border: '1px solid var(--border-strong)', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', background: 'var(--bg-card)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Icons.Sholat size={17} color="var(--text-primary)" />
              Jadwal Sholat
            </Link>
          </div>

          {/* STAT CARDS dengan animasi count-up */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 64 }}>
            <StatCard label="Total Hadist" target={stats.hadist} />
            <StatCard label="Kategori"     target={stats.kategori} />
            <StatCard label="Kitab"        target={stats.kitab} />
          </div>
        </div>
      </section>

      {/* FITUR */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', textAlign: 'center', marginBottom: 40, color: 'var(--text-primary)' }}>
          Semua yang kamu butuhkan
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
          {fiturList.map(f => (
            <div key={f.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow)' }}>
              <div style={{ color: 'var(--accent)', marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 600, marginBottom: 6, fontSize: '1rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOA HARIAN PREVIEW */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: 6 }}>Doa Harian</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Doa-doa yang diajarkan Rasulullah ﷺ untuk keseharian</p>
          </div>
          <Link to="/doa" className="btn-float"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 20px', borderRadius: 9, border: '1px solid var(--border-strong)', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', background: 'var(--bg-card)' }}>
            <Icons.Doa size={14} color="var(--accent)" />
            Lihat Semua Doa →
          </Link>
        </div>

        {doaLoading ? (
          <div style={{ display: 'grid', gap: 10 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ padding: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                <Skel w="40%" h={14} mb={8} />
                <Skel w="70%" h={11} />
              </div>
            ))}
          </div>
        ) : doaPreview.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>Gagal memuat doa</p>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {doaPreview.map(d => <DoaItem key={d.id} doa={d} />)}
          </div>
        )}

        {!doaLoading && doaPreview.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link to="/doa" className="btn-primary-float"
              style={{ padding: '12px 32px', borderRadius: 10, background: 'var(--accent)', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem', boxShadow: '0 4px 14px rgba(181,119,58,0.35)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Icons.Doa size={16} color="#fff" />
              Lihat Semua Doa Harian
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}