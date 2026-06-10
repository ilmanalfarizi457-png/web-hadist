// src/App.jsx

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { injectStyles } from './styles/global';

import Beranda       from './pages/Beranda';
import HadistList    from './pages/HadistList';
import HadistDetail  from './pages/HadistDetail';
import Favorit       from './pages/Favorit';
import Doa           from './pages/Doa';
import JadwalSholat  from './pages/JadwalSholat';
import Tentang       from './pages/Tentang';
import NotFound      from './pages/NotFound';

export default function App() {
  useEffect(() => { injectStyles(); }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"           element={<Beranda />} />
          <Route path="/hadist"     element={<HadistList />} />
          <Route path="/hadist/:id" element={<HadistDetail />} />
          <Route path="/favorit"    element={<Favorit />} />
          <Route path="/doa"        element={<Doa />} />
          <Route path="/sholat"     element={<JadwalSholat />} />
          <Route path="/tentang"    element={<Tentang />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
