import api from './api';

// Get all blogs
export const getAllBlogs = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/api/blogs?${queryString}`);
  return response.data;
};

// Get single blog
export const getBlogById = async (id) => {
  const response = await api.get(`/api/blogs/${id}`);
  return response.data;
};

// Create blog (admin)
export const createBlog = async (blogData) => {
  const response = await api.post('/api/blogs', blogData);
  return response.data;
};

// Update blog (admin)
export const updateBlog = async (id, blogData) => {
  const response = await api.put(`/api/blogs/${id}`, blogData);
  return response.data;
};

// Delete blog (admin)
export const deleteBlog = async (id) => {
  const response = await api.get(`/api/api/blogs?${queryString}`);
  return response.data;
};

// ADD THIS DEFAULT EXPORT AT THE END:
const blogService = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};

export default blogService;