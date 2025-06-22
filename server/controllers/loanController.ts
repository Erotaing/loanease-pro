import { Request, Response } from 'express'
import Loan from '../models/Loan'
import Document from '../models/Document'
import { assessRisk } from '../services/riskAssessment'

// Create new loan application
export const createLoan = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      ssn,
      dateOfBirth,
      employmentType,
      employer,
      jobTitle,
      annualIncome,
      employmentDuration,
      loanAmount,
      loanPurpose,
      loanTerm,
      monthlyExpenses,
      existingDebts,
      creditScore
    } = req.body
    const userId = req.user.id
    
    const loan = new Loan({
      user: userId,
      amount: loanAmount,
      term: loanTerm,
      purpose: loanPurpose,
      status: 'pending',
      personalInfo: {
        firstName,
        lastName,
        email,
        phone,
        ssn,
        dateOfBirth
      },
      employmentInfo: {
        employmentType,
        employer,
        jobTitle,
        annualIncome,
        employmentDuration
      },
      financialInfo: {
        monthlyExpenses,
        existingDebts,
        creditScore
      },
      applicationDate: new Date()
    })
    
    await loan.save()
    
    res.status(201).json({ 
      message: 'Loan application submitted successfully',
      loan 
    })
  } catch (error) {
    console.error('Error creating loan application:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get all loans (admin/loan officer)
export const getLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find().populate('user', 'firstName lastName email')
    res.json(loans)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Update loan
export const updateLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const loan = await Loan.findByIdAndUpdate(id, req.body, { new: true })
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' })
    }
    res.json(loan)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Delete loan
export const deleteLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const loan = await Loan.findByIdAndDelete(id)
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' })
    }
    res.json({ message: 'Loan deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Approve loan
export const approveLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const loan = await Loan.findByIdAndUpdate(
      id,
      { 
        status: 'approved',
        decision: {
          by: req.user.id,
          at: new Date(),
          comments: req.body.comments || 'Loan approved'
        }
      },
      { new: true }
    )
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' })
    }
    res.json(loan)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Reject loan
export const rejectLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const loan = await Loan.findByIdAndUpdate(
      id,
      { 
        status: 'rejected',
        decision: {
          by: req.user.id,
          at: new Date(),
          comments: req.body.comments || 'Loan rejected'
        }
      },
      { new: true }
    )
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' })
    }
    res.json(loan)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Get all loans for a user
export const getUserLoans = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id
    const loans = await Loan.find({ user: userId })
      .populate('documents')
      .sort({ createdAt: -1 })
    
    res.json(loans)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Get loan by ID
export const getLoanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const loan = await Loan.findById(id)
      .populate('documents')
      .populate('user', 'firstName lastName email')
    
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' })
    }
    
    // Check if user is authorized to view this loan
    if (req.user.role !== 'admin' && req.user.role !== 'loan_officer' && 
        loan.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    res.json(loan)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Submit loan application
export const submitLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const loan = await Loan.findById(id)
    
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' })
    }
    
    // Check if user is authorized
    if (loan.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    // Check if loan has required documents
    const documents = await Document.find({ loan: id })
    if (documents.length < 2) { // Assuming at least 2 documents are required
      return res.status(400).json({ 
        message: 'Please upload required documents before submitting' 
      })
    }
    
    // Update loan status
    loan.status = 'submitted'
    
    // Perform risk assessment
    const riskAssessment = await assessRisk({
      amount: loan.amount,
      term: loan.term,
      purpose: loan.purpose,
      userId: loan.user.toString()
    })
    loan.riskScore = riskAssessment.riskScore
    
    await loan.save()
    
    res.json(loan)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Update loan decision (for loan officers and admins)
export const updateLoanDecision = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status, comments } = req.body
    
    // Check if user has permission
    if (req.user.role !== 'admin' && req.user.role !== 'loan_officer') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    const loan = await Loan.findById(id)
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' })
    }
    
    // Update loan
    loan.status = status
    loan.decision = {
      by: req.user.id,
      at: new Date(),
      comments
    }
    
    await loan.save()
    
    res.json(loan)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}