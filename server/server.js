const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { connectDB } = require('./config/db');

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Route imports
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const settingRoutes = require('./routes/settingRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow local development and specified CLIENT_URL
      if (
        !origin ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin === process.env.CLIENT_URL
      ) {
        return callback(null, true);
      }
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded static files
app.use('/uploads', express.static(uploadsDir));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    brand: 'VASTUKRUTA',
    principalArchitect: 'AR. PRANALI GHORPADE',
    status: 'operational',
    timestamp: new Date().toISOString(),
  });
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/upload', uploadRoutes);

// Catch 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Vastukruta Server Error]', err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server if run directly
if (require.main === module && process.env.NODE_ENV !== 'test') {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`[VASTUKRUTA Server] Ar. Pranali Ghorpade Studio API running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('[VASTUKRUTA Server] MongoDB Connection Failure:', err.message);
      app.listen(PORT, () => {
        console.log(`[VASTUKRUTA Server] Running on port ${PORT} (Database pending connection)`);
      });
    });
}

module.exports = app;
