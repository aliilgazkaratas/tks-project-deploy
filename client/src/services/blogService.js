import api from './api';

// Get all blogs
export const getAllBlogs = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/api/blogs?${queryString}`);
  return response.data;
};

// Get single blog by ID
export const getBlogById = async (id) => {
  const response = await api.get(`/api/blogs/${id}`);
  return response.data;
};

// Create new blog (admin only)
export const createBlog = async (blogData) => {
  const response = await api.post('/api/blogs', blogData);
  return response.data;
};

// Update blog (admin only)
export const updateBlog = async (id, blogData) => {
  const response = await api.put(`/api/blogs/${id}`, blogData);
  return response.data;
};

// Delete blog (admin only)
export const deleteBlog = async (id) => {
  const response = await api.delete(`/api/blogs/${id}`);
  return response.data;
};

// Get blogs by author
export const getBlogsByAuthor = async (authorId, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/api/blogs/author/${authorId}?${queryString}`);
  return response.data;
};