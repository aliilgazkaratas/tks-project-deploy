import api from './api';

// Get user profile
export const getUserProfile = async () => {
  const response = await api.get('/api/users/profile');
  return response.data;
};

// Get user registrations
export const getUserRegistrations = async (status) => {
  const params = status ? `?status=${status}` : '';
  const response = await api.get(`/api/users/registrations${params}`);
  return response.data;
};

// Get attendance history
export const getAttendanceHistory = async () => {
  const response = await api.get('/api/users/attendance');
  return response.data;
};

// Get all users (admin only)
export const getAllUsers = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/api/users?${queryString}`);
  return response.data;
};

// Get user by ID (admin only)
export const getUserById = async (id) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
};

// Update user role (admin only)
updateUserRole: async (data) => {
  const response = await api.put('/users/profile', data);
  return response.data;
};

// Delete user (admin only)
export const deleteUser = async (id) => {
  const response = await api.delete(`/api/users/${id}`);
  return response.data;
};