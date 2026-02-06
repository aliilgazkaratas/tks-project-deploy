import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../services/blogService';
import BlogPost from '../components/blog/BlogPost';

const BlogPostPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);
        setBlog(response.blog);
      } catch (err) {
        setError(err.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="error-container">
        <h2>Blog Post Not Found</h2>
        <p>The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="container">
        <BlogPost blog={blog} />
      </div>
    </div>
  );
};

export default BlogPostPage;