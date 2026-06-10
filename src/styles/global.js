// src/styles/global.js

export const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&family=Scheherazade+New:wght@400;700&display=swap');

:root {
  --bg-primary:      #FDFAF5;
  --bg-secondary:    #F5EFE0;
  --bg-card:         #FFFCF5;
  --bg-overlay:      #EDE4CE;
  --text-primary:    #2C2416;
  --text-secondary:  #6B5B3E;
  --text-muted:      #9E8B6C;
  --text-arabic:     #1A3A2A;
  --accent:          #B5773A;
  --accent-light:    #E8C98A;
  --accent-dark:     #7A4F1E;
  --accent-green:    #2D6A4F;
  --accent-green-light: #95D5B2;
  --border:          rgba(181,119,58,0.18);
  --border-strong:   rgba(181,119,58,0.38);
  --shadow:          0 2px 12px rgba(44,36,22,0.07);
  --shadow-md:       0 6px 28px rgba(44,36,22,0.12);
  --radius:          12px;
  --radius-lg:       20px;
  --font-sans:       'Plus Jakarta Sans', sans-serif;
  --font-serif:      'Lora', serif;
  --font-arabic:     'Scheherazade New', serif;
  --nav-h:           64px;
  --ease:            0.2s ease;
  --max-w:           1100px;
}

[data-theme="dark"] {
  --bg-primary:      #19140D;
  --bg-secondary:    #231C11;
  --bg-card:         #2A2216;
  --bg-overlay:      #342B19;
  --text-primary:    #F0E8D8;
  --text-secondary:  #C4AD87;
  --text-muted:      #8C7A5C;
  --text-arabic:     #B8D8BA;
  --accent:          #D4945A;
  --accent-light:    #7A5828;
  --accent-dark:     #F0B87A;
  --accent-green:    #52B788;
  --accent-green-light: #1B4332;
  --border:          rgba(212,148,90,0.18);
  --border-strong:   rgba(212,148,90,0.35);
  --shadow:          0 2px 14px rgba(0,0,0,0.32);
  --shadow-md:       0 6px 32px rgba(0,0,0,0.45);
}

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-sans);
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  transition: background var(--ease), color var(--ease);
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-track { background: var(--bg-secondary); }
::-webkit-scrollbar-thumb { background: var(--accent-light); border-radius:3px; }

.arabic-text {
  font-family: var(--font-arabic);
  font-size: 1.65rem;
  line-height: 2.3;
  direction: rtl;
  text-align: right;
  color: var(--text-arabic);
}

mark.hl {
  background: var(--accent-light);
  color: var(--accent-dark);
  border-radius: 3px;
  padding: 0 2px;
}

@keyframes fadeUp {
  from { opacity:0; transform:translateY(10px); }
  to   { opacity:1; transform:translateY(0); }
}
.fade-up { animation: fadeUp 0.35s ease both; }

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.shimmer {
  background: linear-gradient(
    90deg,
    var(--bg-overlay) 25%,
    var(--bg-secondary) 50%,
    var(--bg-overlay) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
  border-radius: 6px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  width:36px; height:36px; border-radius:50%;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  animation: spin 0.7s linear infinite;
  margin: 0 auto;
}

@keyframes floatPulse {
  0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 4px 14px rgba(181,119,58,0.4); }
  50%       { transform: translateY(-3px) scale(1.01); box-shadow: 0 10px 28px rgba(181,119,58,0.5); }
}

.btn-float {
  transition: transform 0.22s cubic-bezier(.34,1.56,.64,1),
              box-shadow 0.22s ease,
              background 0.18s ease,
              border-color 0.18s ease !important;
}
.btn-float:hover {
  transform: translateY(-3px) scale(1.03) !important;
  box-shadow: 0 8px 24px rgba(181,119,58,0.35) !important;
}
.btn-float:active {
  transform: translateY(0px) scale(0.97) !important;
  box-shadow: 0 2px 8px rgba(181,119,58,0.2) !important;
}

.btn-float-sm {
  transition: transform 0.2s cubic-bezier(.34,1.56,.64,1),
              box-shadow 0.2s ease,
              background 0.18s ease !important;
}
.btn-float-sm:hover {
  transform: translateY(-2px) scale(1.06) !important;
  box-shadow: 0 6px 18px rgba(181,119,58,0.28) !important;
}
.btn-float-sm:active {
  transform: translateY(0px) scale(0.95) !important;
}

.btn-primary-float {
  transition: transform 0.22s cubic-bezier(.34,1.56,.64,1),
              box-shadow 0.22s ease !important;
}
.btn-primary-float:hover {
  animation: floatPulse 1.8s ease-in-out infinite !important;
}
.btn-primary-float:active {
  animation: none !important;
  transform: scale(0.96) translateY(1px) !important;
}

@media (max-width: 768px) {
  .hide-mobile { display: none !important; }
  .show-mobile { display: flex !important; }
  .arabic-text { font-size:1.35rem; line-height:2.1; }
}
@media (min-width: 769px) {
  .show-mobile { display: none !important; }
}
`;

export function injectStyles() {
  if (document.getElementById('hadist-ilmi-styles')) return;
  const s = document.createElement('style');
  s.id = 'hadist-ilmi-styles';
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}
