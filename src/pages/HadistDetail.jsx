// src/pages/HadistDetail.jsx

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hApi } from '../services/api';
import { downloadHadistPDF } from '../utils/pdfHelpers';
import { Badge, BmBtn, Skel } from '../components/ui';
import { Icons } from '../components/Icons';
import { Footer } from '../components/layout/Footer';
import { actionBtnStyle, navLinkCard } from '../utils/styleConstants';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '');

export default function HadistDetail() {
  const { id } = useParams();
  const [data, setData]                   = useState(null);
  const [loading, setLd]                  = useState(true);
  const [copied, setCopied]               = useState(false);
  const [pdfLoading, setPdfLd]            = useState(false);
  const [isPlayingArab, setIsPlayingArab] = useState(false);
  const [isPlayingIndo, setIsPlayingIndo] = useState(false);

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    if (window._ttsAudio) {
      window._ttsAudio.pause();
      URL.revokeObjectURL(window._ttsAudio.src);
      window._ttsAudio = null;
    }
    setIsPlayingArab(false);
    setIsPlayingIndo(false);
  };

  const speak = (text, lang, setPlaying) => {
    stopSpeech();

    if (lang === 'ar-SA') {
      const encoded = encodeURIComponent(text.slice(0, 200));
      const url = `${API_URL}/api/tts?text=${encoded}&lang=ar`;

      fetch(url)
        .then(res => res.blob())
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);
          const audio = new Audio(blobUrl);
          audio.onended = () => { setPlaying(false); URL.revokeObjectURL(blobUrl); };
          audio.onerror = () => { setPlaying(false); URL.revokeObjectURL(blobUrl); };
          window._ttsAudio = audio;
          setPlaying(true);
          audio.play();
        })
        .catch(() => setPlaying(false));
    } else {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      const trySpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        const match = voices.find(v => v.lang.startsWith('id'));
        if (match) utter.voice = match;
        utter.onend   = () => setPlaying(false);
        utter.onerror = () => setPlaying(false);
        setPlaying(true);
        window.speechSynthesis.speak(utter);
      };
      if (window.speechSynthesis.getVoices().length) {
        trySpeak();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          trySpeak();
          window.speechSynthesis.onvoiceschanged = null;
        };
      }
    }
  };

  useEffect(() => {
    if (!id || id === 'undefined') { setLd(false); return; }

    setLd(true);
    setData(null);

    hApi.getById(id)
      .then(r => {
        setData(r.data.data);
        setLd(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(() => setLd(false));

    return () => stopSpeech();
  }, [id]);

  const copy = text => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePDF = async () => {
    if (pdfLoading) return;
    setPdfLd(true);
    try {
      await downloadHadistPDF(data.data);
    } catch (err) {
      console.error('PDF error:', err);
      alert('Gagal membuat PDF. Pastikan koneksi internet aktif.');
    } finally {
      setPdfLd(false);
    }
  };

  const btnVoiceStyle = (active) => ({
    background: active ? '#dcfce7' : 'var(--bg-card)',
    border: `1px solid ${active ? '#86efac' : 'var(--border)'}`,
    borderRadius: 7,
    padding: '5px 10px',
    fontSize: '0.72rem',
    cursor: 'pointer',
    color: active ? '#16a34a' : 'var(--text-muted)',
    fontFamily: 'var(--font-sans)',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    transition: 'all 0.2s',
  });

  if (!id || id === 'undefined') return (
    <div style={{ textAlign: 'center', padding: '120px 24px', color: 'var(--text-muted)' }}>
      <p style={{ fontSize: '1.1rem', marginBottom: 12 }}>ID Hadist tidak valid</p>
      <Link to="/hadist" style={{ color: 'var(--accent)' }}>← Kembali ke Hadist</Link>
    </div>
  );

  if (loading) return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: 'calc(var(--nav-h) + 60px) 24px' }}>
      <Skel w="30%" h={12} mb={32} />
      <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: 40 }}>
        <Skel w="50%" h={20} mb={20} />
        <Skel h={80} mb={20} />
        <Skel h={16} mb={10} />
        <Skel w="80%" h={16} mb={10} />
        <Skel w="65%" h={16} />
      </div>
    </div>
  );

  if (!data) return (
    <div style={{ textAlign: 'center', padding: '120px 24px', color: 'var(--text-muted)' }}>
      <p style={{ fontSize: '1.1rem', marginBottom: 12 }}>Hadist tidak ditemukan</p>
      <Link to="/hadist" style={{ color: 'var(--accent)' }}>← Kembali ke Hadist</Link>
    </div>
  );

  const { data: h, prev, next } = data;

  const kitabNama    = typeof h.kitab === 'object' ? h.kitab?.nama : h.kitab || 'Kitab';
  const kategoriNama = typeof h.kategori === 'object' ? h.kategori?.nama : h.kategori || null;

  const shareText = `*${h.judul}* (${kitabNama}, No. ${h.nomor})\n\n${h.arab}\n\n_"${h.terjemahan}"_\n\n📖 via Hadist Ilmi`;

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: 'calc(var(--nav-h) + 32px) 24px 64px' }}>

      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 28, flexWrap: 'wrap' }}>
        <Link to="/hadist" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Hadist</Link>
        <span>/</span><span>{kitabNama}</span><span>/</span><span>No. {h.nomor}</span>
      </nav>

      {/* Main card */}
      <article style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 40, boxShadow: 'var(--shadow-md)', marginBottom: 20 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
              <Badge variant="accent">{kitabNama}</Badge>
              {kategoriNama && <Badge variant="green">{kategoriNama}</Badge>}
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>{h.judul}</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: 'var(--bg-overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--accent)', fontSize: '1.1rem', border: '1px solid var(--border-strong)' }}>
              #{h.nomor}
            </div>
            <BmBtn hadist={h} size={24} />
          </div>
        </div>

        {/* Arabic text */}
        <div style={{ background: 'var(--bg-overlay)', borderRadius: 14, padding: '28px 28px', marginBottom: 28, borderLeft: '4px solid var(--accent)', position: 'relative' }}>
          <p className="arabic-text">{h.arab}</p>
          <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
            <button onClick={() => copy(h.arab)} title="Salin teks Arab" className="btn-float-sm"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 7, padding: '5px 10px', fontSize: '0.72rem', cursor: 'pointer', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 5 }}>
              {copied ? <Icons.Check size={12} color="var(--accent-green)" /> : <Icons.Copy size={12} />}
              {copied ? 'Tersalin' : 'Salin'}
            </button>
            <button onClick={() => isPlayingArab ? stopSpeech() : speak(h.arab, 'ar-SA', setIsPlayingArab)}
              className="btn-float-sm" style={btnVoiceStyle(isPlayingArab)}>
              {isPlayingArab ? <Icons.VolumeX size={12} /> : <Icons.Volume2 size={12} />}
              {isPlayingArab ? 'Stop' : 'Dengar'}
            </button>
          </div>
        </div>

        {/* Terjemahan */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <h2 style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Terjemahan</h2>
            <button onClick={() => isPlayingIndo ? stopSpeech() : speak(h.terjemahan, 'id-ID', setIsPlayingIndo)}
              className="btn-float-sm" style={btnVoiceStyle(isPlayingIndo)}>
              {isPlayingIndo ? <Icons.VolumeX size={12} /> : <Icons.Volume2 size={12} />}
              {isPlayingIndo ? 'Stop' : 'Dengar'}
            </button>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1rem' }}>{h.terjemahan}</p>
        </div>

        {/* Perawi */}
        {h.perawi && (
          <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Diriwayatkan oleh: <strong style={{ fontStyle: 'normal', color: 'var(--text-secondary)' }}>{h.perawi}</strong>
            </p>
          </div>
        )}

        {/* Actions */}
        <div style={{ paddingTop: 20, marginTop: 16, borderTop: '1px solid var(--border)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={() => copy(shareText)} className="btn-float" style={actionBtnStyle}>
            <Icons.Copy size={13} /> Salin Hadist
          </button>
          <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer"
            className="btn-float" style={{ ...actionBtnStyle, textDecoration: 'none' }}>
            <Icons.Share size={13} /> Bagikan
          </a>
          <button onClick={handlePDF} disabled={pdfLoading} className="btn-float"
            style={{ ...actionBtnStyle, opacity: pdfLoading ? 0.6 : 1, cursor: pdfLoading ? 'wait' : 'pointer' }}>
            <Icons.Download size={13} />
            {pdfLoading ? 'Membuat PDF...' : 'Unduh PDF'}
          </button>
        </div>
      </article>

      {/* Prev / Next */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {prev ? (
          <Link to={`/hadist/${prev.id}`} className="btn-float" style={navLinkCard}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>← Sebelumnya</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>#{prev.nomor} {prev.judul}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/hadist/${next.id}`} className="btn-float" style={{ ...navLinkCard, textAlign: 'right' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Selanjutnya →</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>#{next.nomor} {next.judul}</span>
          </Link>
        ) : <div />}
      </div>

      <Footer />
    </div>
  );
}