const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'public', 'uploads', 'profiles');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// CORS Configuration
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5000,http://localhost:3000').split(',');
app.use(cors({
  origin: corsOrigins.map(origin => origin.trim()),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve frontend build in production
const frontendBuildPath = path.join(__dirname, '../frontend-vite/dist');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
}

// API routes
app.use('/api/users', require('./routes/userRoutes'));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/user_management';
console.log('Attempting MongoDB connection to:', mongoURI.replace(/:[^:]*@/, ':***@'));  // Hide credentials
mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 15000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    global.mongoConnected = true;
  })
  .catch(err => {
    console.error('⚠ MongoDB connection failed:', err.message);
    console.error('⚠ Make sure MongoDB is running and MONGODB_URI is correctly configured');
    console.error('⚠ API will not work without MongoDB connection');
    global.mongoConnected = false;
  });

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(frontendBuildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════════════╗`);
  console.log(`║ Server running on port ${PORT.toString().padEnd(33)}║`);
  console.log(`║ Environment: ${NODE_ENV.toUpperCase().padEnd(30)}║`);
  console.log(`║ API available at: /api║`);
  console.log(`║ Frontend available at: /│`.padEnd(46) + '║');
  console.log(`╚════════════════════════════════════════════════╝\n`);
});

