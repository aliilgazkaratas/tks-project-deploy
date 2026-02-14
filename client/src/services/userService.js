import api from './api';

const userService = {
  // Get user profile
  getUserProfile: async () => {
    const response = await api.get('/api/users/profile');

    return response.data;
  },

  // Update user profile
  updateProfile: async (data) => {
  const response = await api.put('/api/users/profile', data);
  return response.data; 
  },

  // Change password
  changePassword: async (data) => {
    const response = await api.put('/api/users/change-password', data);
    return response.data;
  },

  // Get user registrations
  getUserRegistrations: async (status) => {
    const params = status ? `?status=${status}` : '';
    const response = await api.get(`/api/users/registrations${params}`);
    return response.data;
  },

  // Get attendance history
  getAttendanceHistory: async () => {
    const response = await api.get('/api/users/attendance');
    return response.data;
  },

  // Get all users (admin only)
  getAllUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/api/users?${queryString}`);
    return response.data;
  },

  // Get user by ID (admin only)
  getUserById: async (id) => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },

  // Update user role (admin only)
  updateUserRole: async (id, role) => {
    const response = await api.put(`/api/users/${id}/role`, { role });
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (id) => {
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
  }
};

export default userService;

// Also export individual functions for backwards compatibility
export const getUserProfile = userService.getUserProfile;
export const getUserRegistrations = userService.getUserRegistrations;
export const getAttendanceHistory = userService.getAttendanceHistory;
export const getAllUsers = userService.getAllUsers;
export const getUserById = userService.getUserById;
export const updateUserRole = userService.updateUserRole;
export const deleteUser = userService.deleteUser;