import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide blog title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
      type: String,
      required: [true, 'Please provide blog content'],
      minlength: [100, 'Content must be at least 100 characters']
    },
    excerpt: {
      type: String,
      maxlength: [300, 'Excerpt cannot exceed 300 characters']
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/800x400?text=Blog+Image'
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published'
    }
  },
  {
    timestamps: true
  }
);

// Auto-generate excerpt from content if not provided
blogSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150) + '...';
  }
  next();
});

// Index for text search
blogSchema.index({ title: 'text', content: 'text' });
blogSchema.index({ author: 1 });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

// Auto-excerpt: Generates from first 150 chars if not provided
// Text index: Enables full-text search on title/content
// Views tracking: For analytics (optional feature)