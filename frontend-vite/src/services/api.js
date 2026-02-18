import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get the base server URL for static files (like profile pictures)
const getServerBaseURL = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // If API_URL is relative (e.g., /api), use the current origin
  if (apiUrl.startsWith('/')) {
    return window.location.origin;
  }
  
  // If API_URL is absolute (e.g., http://localhost:5000/api), extract the base
  const url = new URL(apiUrl);
  return `${url.protocol}//${url.host}`;
};

const api = axios.create({
  baseURL: API_BASE_URL
});

export const getImageURL = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${getServerBaseURL()}${imagePath}`;
};

export const userAPI = {
  getAllUsers: (page = 1, limit = 10, sortBy = 'createdAt', order = 'desc') =>
    api.get('/users', { params: { page, limit, sortBy, order } }),

  getUserById: (id) =>
    api.get(`/users/${id}`),

  createUser: async (formData) => {
    try {
      const response = await api.post('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);

      if (error.response?.data?.errors) {
        const validationErrors = {};
        error.response.data.errors.forEach((err) => {
          validationErrors[err.param] = err.msg;
        });
        error.validationErrors = validationErrors;
      }

      throw error;
    }
  },

  updateUser: async (id, formData) => {
    try {
      const response = await api.put(`/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);

      if (error.response?.data?.errors) {
        const validationErrors = {};
        error.response.data.errors.forEach((err) => {
          validationErrors[err.param] = err.msg;
        });
        error.validationErrors = validationErrors;
      }

      throw error;
    }
  },

  deleteUser: (id) =>
    api.delete(`/users/${id}`),

  searchUsers: (q, page = 1, limit = 10) =>
    api.get('/users/search', { params: { q, page, limit } }),

  toggleUserStatus: (id) =>
    api.patch(`/users/${id}/status`),

  exportToCSV: () =>
    api.get('/users/export/csv', { responseType: 'blob' })
};
