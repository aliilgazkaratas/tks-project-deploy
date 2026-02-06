import { FiCalendar, FiUser, FiEye, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateFormatter';
import Card from '../common/Card';
import './BlogPost.css';

const BlogPost = ({ blog }) => {
  return (
    <div className="blog-post-container">
      {/* Back Button */}
      <Link to="/blogs" className="back-link">
        <FiArrowLeft /> Back to Blogs
      </Link>

      <Card className="blog-post">
        {/* Header */}
        <div className="blog-post-header">
          <h1 className="blog-post-title">{blog.title}</h1>

          <div className="blog-post-meta">
            <div className="meta-item">
              <FiUser className="meta-icon" />
              <span>{blog.author?.name || 'Anonymous'}</span>
            </div>
            <div className="meta-item">
              <FiCalendar className="meta-icon" />
              <span>{formatDateTime(blog.createdAt)}</span>
            </div>
            <div className="meta-item">
              <FiEye className="meta-icon" />
              <span>{blog.views} views</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="blog-post-image">
          <img src={blog.imageUrl} alt={blog.title} />
        </div>

        {/* Content */}
        <div className="blog-post-content">
          <p className="blog-post-text">{blog.content}</p>
        </div>

        {/* Author Info */}
        {blog.author && (
          <div className="blog-author-section">
            <h3>About the Author</h3>
            <div className="author-card">
              <img
                src={blog.author.profilePicture}
                alt={blog.author.name}
                className="author-avatar"
              />
              <div>
                <h4>{blog.author.name}</h4>
                <p>{blog.author.email}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BlogPost;