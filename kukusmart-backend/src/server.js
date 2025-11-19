

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './config/db.js';

// Import routes
import productRoutes from './routes/products.js';
import sellerRoutes from './routes/sellers.js';
import diseaseRoutes from './routes/diseases.js';
import articleRoutes from './routes/articles.js';
import orderRoutes from './routes/orders.js';
import mpesaRoutes from './routes/mpesa.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*', // In production, replace with your Vercel domain
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'KukuSmart API is running',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/diseases', diseaseRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/mpesa', mpesaRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});

