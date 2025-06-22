import express from 'express'
import { register, login, getCurrentUser } from '../controllers/authController'
import auth from '../middleware/auth'
import { validateRegister, validateLogin } from '../middleware/validate'

const router = express.Router()

// Public routes
router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)

// Protected routes
router.get('/me', auth, getCurrentUser)

export default router