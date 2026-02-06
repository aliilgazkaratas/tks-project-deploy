import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );
  next();
});

// Body parser middleware
// IMPORTANT: Webhook route needs raw body, so we apply express.json() after defining webhook route
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies (for base64 images)
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'TKS Travel Society API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      events: '/api/events',
      blogs: '/api/blogs',
      users: '/api/users',
      payments: '/api/payments'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 TKS Travel Society API Server     ║
║                                        ║
║  📡 Port: ${PORT}                       ║
║  🌍 Environment: ${process.env.NODE_ENV || 'development'}       ║
║  🔗 URL: http://localhost:${PORT}      ║
║                                        ║
║  📚 API Documentation:                 ║
║     /api/auth    - Authentication      ║
║     /api/events  - Events Management   ║
║     /api/blogs   - Blog Posts          ║
║     /api/users   - User Management     ║
║     /api/payments - Payment Processing ║
╚════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});
/*
```

**Key Points:**
- **Webhook special handling**: Raw body for Stripe webhook, JSON for everything else
- **CORS**: Allows frontend to communicate with backend
- **Error handling**: Centralized error handler catches all errors
- **Graceful shutdown**: Handles unhandled promise rejections
- **API documentation**: Root route shows available endpoints

---

## **Step 12: Create .gitignore**

### **File: `server/.gitignore`**
```
# Dependencies
node_modules/

# Environment variables
.env
.env.local
.env.production

# Logs
logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Testing
coverage/

# Build
dist/
build*/