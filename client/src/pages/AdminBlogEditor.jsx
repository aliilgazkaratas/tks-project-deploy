import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import blogService from '../services/blogService';
import './AdminBlogEditor.css';

const AdminBlogEditor = () => {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await blogService.getAllBlogs();
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await blogService.updateBlog(editing, formData);
      } else {
        await blogService.createBlog(formData);
      }
      resetForm();
      fetchBlogs();
    } catch (err) {
      alert('Failed to save blog');
    }
  };

  const handleEdit = (blog) => {
    setEditing(blog._id);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || '',
      imageUrl: blog.imageUrl || ''
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this blog?')) {
      await blogService.deleteBlog(id);
      fetchBlogs();
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({ title: '', content: '', excerpt: '', imageUrl: '' });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  return (
    <div className="admin-blog-editor">
      <div className="container">
        <h1>{editing ? 'Edit Blog' : 'Create New Blog'}</h1>
        
        <form onSubmit={handleSubmit} className="blog-form">
          <input
            type="text"
            placeholder="Blog Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          
          <input
            type="text"
            placeholder="Excerpt (short description)"
            value={formData.excerpt}
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
          />
          
          <input
            type="url"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
          />

          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(content) => setFormData({...formData, content})}
            modules={modules}
            placeholder="Write your blog content..."
          />

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editing ? 'Update' : 'Publish'} Blog
            </button>
            {editing && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="blog-list">
          <h2>Published Blogs</h2>
          {blogs.map(blog => (
            <div key={blog._id} className="blog-item">
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <div className="blog-actions">
                <button onClick={() => handleEdit(blog)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(blog._id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditor;