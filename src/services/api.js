// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env?.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
});

export const hApi = {
  getAll: p => api.get('/hadist', { params: p }),
  getById: id => api.get(`/hadist/${id}`),
};

export const kApi = {
  getAll: () => api.get('/kategori'),
};

export const kbApi = {
  getAll: () => api.get('/kitab'),
};

export const dApi = {
  getAll: p => api.get('/doa', { params: p }),
};
