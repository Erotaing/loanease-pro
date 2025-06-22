import mongoose from 'mongoose'
import config from './config'

const connectDB = async (): Promise<void> => {
  try {
    // Try to connect to MongoDB
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    })
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.warn('⚠️ MongoDB connection failed, trying in-memory database:', error.message)
    try {
      // Fallback to in-memory MongoDB for development
      const { MongoMemoryServer } = require('mongodb-memory-server')
      const mongod = new MongoMemoryServer()
      await mongod.start()
      const uri = mongod.getUri()
      const conn = await mongoose.connect(uri)
      console.log('✅ Connected to in-memory MongoDB for development')
    } catch (memoryError) {
      console.warn('⚠️ In-memory database also failed, running without database:', memoryError.message)
      // The app will continue to run but database operations will fail gracefully
    }
  }
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('📊 Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('📊 Mongoose disconnected from MongoDB')
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('📊 MongoDB connection closed through app termination')
  process.exit(0)
})

export default connectDB