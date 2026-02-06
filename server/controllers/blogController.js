import Blog from '../models/Blog.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getAllBlogs = async (req, res, next) => {
  try {
    const { search, status, sort, page = 1, limit = 10 } = req.query;

    // Build query
    const query = {};

    // Filter by status (for admins)
    if (status && req.user && req.user.role === 'admin') {
      query.status = status;
    } else {
      // Public users only see published blogs
      query.status = 'published';
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Sort options
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'views') sortOption = { views: -1 };
    if (sort === 'title') sortOption = { title: 1 };

    // Execute query
    const blogs = await Blog.find(query)
      .populate('author', 'name email profilePicture')
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count
    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      blogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email profilePicture');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Only allow viewing published blogs (unless admin)
    if (blog.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
      return res.status(403).json({
        success: false,
        message: 'Blog not available'
      });
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, imageUrl, status } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and content'
      });
    }

    // Validate content length
    if (content.length < 100) {
      return res.status(400).json({
        success: false,
        message: 'Content must be at least 100 characters'
      });
    }

    // Create blog
    const blog = await Blog.create({
      title,
      content,
      excerpt,
      imageUrl: imageUrl || undefined,
      status: status || 'published',
      author: req.user._id
    });

    // Populate author info
    await blog.populate('author', 'name email profilePicture');

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, imageUrl, status } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is author or admin
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog'
      });
    }

    // Update fields
    if (title) blog.title = title;
    if (content) {
      if (content.length < 100) {
        return res.status(400).json({
          success: false,
          message: 'Content must be at least 100 characters'
        });
      }
      blog.content = content;
    }
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (imageUrl) blog.imageUrl = imageUrl;
    if (status) blog.status = status;

    await blog.save();

    // Populate author info
    await blog.populate('author', 'name email profilePicture');

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is author or admin
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog'
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blogs by author
// @route   GET /api/blogs/author/:authorId
// @access  Public
export const getBlogsByAuthor = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Build query - only published blogs for public
    const query = {
      author: req.params.authorId,
      status: 'published'
    };

    // If requesting user is admin or the author themselves, show all statuses
    if (req.user && (req.user.role === 'admin' || req.user._id.toString() === req.params.authorId)) {
      delete query.status;
    }

    const blogs = await Blog.find(query)
      .populate('author', 'name email profilePicture')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      blogs
    });
  } catch (error) {
    next(error);
  }
};

// getAllBlogs: Public sees only published, admins see all statuses
// getBlogById: Increments view count, checks publication status
// createBlog: Admin only, validates content length
// updateBlog: Only author or admin can update
// deleteBlog: Only author or admin can delete
// getBlogsByAuthor: Get all blogs by specific author
