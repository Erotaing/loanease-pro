import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import connectDB from '../config/db'
import config from '../config/config'

// Import routes
import authRoutes from '../routes/authRoutes'
import loanRoutes from '../routes/loanRoutes'
import userRoutes from '../routes/userRoutes'
import adminRoutes from '../routes/adminRoutes'
import documentRoutes from '../routes/documentRoutes'

// Import middleware
import { errorHandler } from '../middleware/error'
import { logger } from '../middleware/logger'

// Load environment variables
dotenv.config()

// Create Express app
const app = express()
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging middleware
app.use(logger)

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'LoanEase Pro API is running',
    timestamp: new Date().toISOString()
  })
})

// API base route
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'LoanEase Pro API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      loans: '/api/loans',
      users: '/api/users',
      admin: '/api/admin',
      documents: '/api/documents'
    },
    documentation: 'See API documentation for detailed endpoint information'
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/loans', loanRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/documents', documentRoutes)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  })
})

// Error handling middleware (must be last)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 API URL: http://localhost:${PORT}/api`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log('Unhandled Promise Rejection:', err.message)
  process.exit(1)
})

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.log('Uncaught Exception:', err.message)
  process.exit(1)
})

export default app