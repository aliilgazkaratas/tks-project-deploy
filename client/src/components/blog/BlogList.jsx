import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import BlogCard from './BlogCard';
import Button from '../common/Button';
import './BlogList.css';

const BlogList = ({ blogs, loading, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  if (loading) {
    return (
      <div className="blog-list-loading">
        <div className="spinner"></div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="blog-list-container">
      {/* Search Bar */}
      <form className="blog-search-bar" onSubmit={handleSearch}>
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Button type="submit" size="small">
          Search
        </Button>
      </form>

      {/* Results Count */}
      <div className="results-info">
        <p>
          {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'} found
        </p>
      </div>

      {/* Blogs Grid */}
      {blogs.length > 0 ? (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="no-blogs">
          <p>No blogs found.</p>
          <Button onClick={() => { setSearchTerm(''); onSearch(''); }}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogList;