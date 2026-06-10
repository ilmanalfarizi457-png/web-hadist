// src/hooks/useBookmark.js

import { useState, useEffect } from 'react';

export function useBookmark() {
  const [bm, setBm] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hi-bm')) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('hi-bm', JSON.stringify(bm));
  }, [bm]);

  const isBookmarked = id => bm.some(b => b.id === id);

  const toggle = hadist =>
    setBm(prev =>
      isBookmarked(hadist.id)
        ? prev.filter(b => b.id !== hadist.id)
        : [...prev, hadist]
    );

  return { bookmarks: bm, isBookmarked, toggle };
}
