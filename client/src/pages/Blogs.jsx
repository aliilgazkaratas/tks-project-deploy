import { useEffect, useState } from 'react';
import { getAllBlogs } from '../services/blogService';
import BlogList from '../components/blog/BlogList';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async (searchTerm = '') => {
    try {
      setLoading(true);
      const response = await getAllBlogs({ search: searchTerm });
      setBlogs(response.blogs);
    } catch (err) {
      setError(err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSearch = (searchTerm) => {
    fetchBlogs(searchTerm);
  };

  return (
    <div className="blogs-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Travel Stories & Tips</h1>
          <p>Read about adventures, destinations, and travel inspiration</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Blog List */}
        <BlogList blogs={blogs} loading={loading} onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Blogs;