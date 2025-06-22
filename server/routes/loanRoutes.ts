import express from 'express'
import {
  createLoan,
  getLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
  approveLoan,
  rejectLoan
} from '../controllers/loanController'
import auth from '../middleware/auth'

const router = express.Router()

// All routes require authentication
router.use(auth)

// Loan CRUD operations
router.post('/', createLoan)
router.get('/', getLoans)
router.get('/:id', getLoanById)
router.put('/:id', updateLoan)
router.delete('/:id', deleteLoan)

// Loan approval/rejection (admin only)
router.put('/:id/approve', approveLoan)
router.put('/:id/reject', rejectLoan)

export default router