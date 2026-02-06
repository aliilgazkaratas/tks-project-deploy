import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiEye } from 'react-icons/fi';
import { formatShortDate } from '../../utils/dateFormatter';
import Card from '../common/Card';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  return (
    <Card className="blog-card" hover>
      <Link to={`/blogs/${blog._id}`} className="blog-card-link">
        {/* Image */}
        <div className="blog-card-image">
          <img src={blog.imageUrl} alt={blog.title} />
        </div>

        {/* Content */}
        <div className="blog-card-content">
          <h3 className="blog-card-title">{blog.title}</h3>

          <p className="blog-card-excerpt">
            {blog.excerpt || `${blog.content.substring(0, 150)}...`}
          </p>

          {/* Meta Info */}
          <div className="blog-card-meta">
            <div className="meta-group">
              <span className="meta-item">
                <FiUser className="meta-icon" />
                {blog.author?.name || 'Anonymous'}
              </span>
              <span className="meta-item">
                <FiCalendar className="meta-icon" />
                {formatShortDate(blog.createdAt)}
              </span>
            </div>
            <span className="meta-item">
              <FiEye className="meta-icon" />
              {blog.views} views
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default BlogCard;