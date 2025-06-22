import express from 'express'
import {
  getAllUsers,
  getAllLoans,
  getUserById,
  updateUserStatus,
  getDashboardStats
} from '../controllers/adminController'
import auth from '../middleware/auth'

const router = express.Router()

// All routes require authentication and admin role
router.use(auth)

// Admin dashboard
router.get('/dashboard', getDashboardStats)

// User management
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.put('/users/:id/status', updateUserStatus)

// Loan management
router.get('/loans', getAllLoans)

export default router