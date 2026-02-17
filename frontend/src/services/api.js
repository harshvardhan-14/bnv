import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

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