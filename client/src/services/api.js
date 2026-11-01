import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vastukruta_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized and on admin page, remove token
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('vastukruta_token');
        localStorage.removeItem('vastukruta_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updatePassword: (passwords) => api.put('/auth/update-password', passwords),
};

// Projects API
export const projectAPI = {
  getAll: (params = {}) => api.get('/projects', { params }),
  getBySlug: (slugOrId) => api.get(`/projects/${slugOrId}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Enquiries API
export const enquiryAPI = {
  submit: (formData) => api.post('/enquiries', formData),
  getAll: (params = {}) => api.get('/enquiries', { params }),
  getById: (id) => api.get(`/enquiries/${id}`),
  updateStatus: (id, statusData) => api.patch(`/enquiries/${id}/status`, statusData),
  delete: (id) => api.delete(`/enquiries/${id}`),
  getStats: () => api.get('/enquiries/stats'),
};

// Studio Settings API
export const settingAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

// Upload API
export const uploadAPI = {
  uploadSingle: (formData) =>
    api.post('/upload/single', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  uploadMultiple: (formData) =>
    api.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export default api;
