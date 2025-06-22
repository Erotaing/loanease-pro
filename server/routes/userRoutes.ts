import express from 'express'
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  getUserLoans
} from '../controllers/userController'
import auth from '../middleware/auth'

const router = express.Router()

// All routes require authentication
router.use(auth)

// User profile operations
router.get('/profile', getUserProfile)
router.put('/profile', updateUserProfile)
router.delete('/profile', deleteUserAccount)

// User's loans
router.get('/loans', getUserLoans)

export default router