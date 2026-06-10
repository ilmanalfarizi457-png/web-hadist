// src/pages/Tentang.jsx

import { Footer } from '../components/layout/Footer';

export default function Tentang() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 'calc(var(--nav-h) + 32px) 24px 64px' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 48, boxShadow: 'var(--shadow-md)', marginBottom: 24, textAlign: 'center' }}>

        {/* Logo bulan sabit + bintang */}
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ borderRadius: 18, margin: '0 auto 20px', display: 'block', boxShadow: '0 4px 16px rgba(181,119,58,0.4)' }}>
          <defs>
            <linearGradient id="logoGradLg" x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B5773A"/>
              <stop offset="100%" stopColor="#7A4A1A"/>
            </linearGradient>
          </defs>
          <rect width="72" height="72" rx="18" fill="url(#logoGradLg)"/>
          <circle cx="35" cy="35" r="16" fill="#F5E6C8"/>
          <circle cx="41" cy="30" r="13" fill="#8B5020"/>
          <polygon
            points="50,24 51.4,28.2 55.8,28.2 52.3,30.7 53.5,34.8 50,32.3 46.5,34.8 47.7,30.7 44.2,28.2 48.6,28.2"
            fill="#F5E6C8"/>
        </svg>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: 10 }}>Hadist Ilmi</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 32 }}>Platform hadist digital berbahasa Indonesia</p>

        <div style={{ background: 'var(--bg-overlay)', borderRadius: 12, padding: '20px 28px', marginBottom: 32 }}>
          <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.5rem', color: 'var(--text-arabic)', marginBottom: 8 }}>
            خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            "Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya." (HR. Bukhari)
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {[
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 8l0 4" />
                <path d="M12 16l.01 0" />
              </svg>
            ),
            title: 'Misi Saya',
            text: 'Memudahkan umat Islam Indonesia dalam mengakses, mempelajari, dan mengamalkan hadist-hadist Nabi Muhammad ﷺ melalui platform digital yang modern dan mudah digunakan.'
          },
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                <path d="M3 6v13" />
                <path d="M12 6v13" />
                <path d="M21 6v13" />
              </svg>
            ),
            title: 'Sumber Data',
            text: "Koleksi hadist bersumber dari kitab-kitab mu'tabar (terpercaya) yang telah melalui proses kurasi. Setiap hadist dilengkapi dengan keterangan kitab dan nomor hadist."
          },
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              </svg>
            ),
            title: 'Teknologi',
            text: 'Dibangun dengan React.js untuk frontend dan Laravel untuk backend API. Database MySQL. Desain responsif untuk semua perangkat.'
          },
        ].map(item => (
          <div key={item.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, boxShadow: 'var(--shadow)' }}>
            <div style={{ color: 'var(--accent)', marginBottom: 10 }}>{item.icon}</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: 8 }}>{item.title}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9rem' }}>{item.text}</p>
          </div>
        ))}

        {/* KONTAK */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, boxShadow: 'var(--shadow)' }}>
          <div style={{ color: 'var(--accent)', marginBottom: 10 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
              <path d="M3 7l9 6l9 -6" />
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: 16 }}>Kontak</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Email — buka Gmail di browser langsung */}
            <a
              href="https://mail.google.com/mail/?view=cm&to=ilmanalfarizi458@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                <path d="M3 7l9 6l9 -6" />
              </svg>
              ilmanalfarizi458@gmail.com
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/ilmanalfarizi457-png"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
              github.com/ilmaw
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/ilminee"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M16.5 7.5l0 .01" />
              </svg>
              @ilminee
            </a>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
