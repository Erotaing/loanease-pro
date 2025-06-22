import dotenv from 'dotenv'

dotenv.config()

export default {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/loanease',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8001',
  plaid: {
    clientId: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    env: process.env.PLAID_ENV || 'sandbox'
  }
}