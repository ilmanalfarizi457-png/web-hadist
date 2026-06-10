// src/components/layout/Footer.jsx

export function Footer() {
  return (
    <footer style={{ marginTop: 80, borderTop: '1px solid var(--border)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.4rem', color: 'var(--accent)', marginBottom: 8 }}>
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Hadist Ilmi —{' '}
          <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.95rem' }}>
            بَلِّغُوا عَنِّي وَلَوْ آيَةً
          </span>
          {' '}(Sampaikanlah dariku walau satu ayat)
        </p>
      </div>
    </footer>
  );
}