import { Request, Response } from 'express'
import User from '../models/User'
import Loan from '../models/Loan'
import Document from '../models/Document'

// Get dashboard statistics
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalLoans = await Loan.countDocuments()
    const pendingLoans = await Loan.countDocuments({ status: 'pending' })
    const approvedLoans = await Loan.countDocuments({ status: 'approved' })
    const rejectedLoans = await Loan.countDocuments({ status: 'rejected' })
    const totalDocuments = await Document.countDocuments()
    
    const totalLoanAmount = await Loan.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
    
    const approvedLoanAmount = await Loan.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
    
    res.json({
      totalUsers,
      totalLoans,
      pendingLoans,
      approvedLoans,
      rejectedLoans,
      totalDocuments,
      totalLoanAmount: totalLoanAmount[0]?.total || 0,
      approvedLoanAmount: approvedLoanAmount[0]?.total || 0
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit
    
    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
    
    const total = await User.countDocuments()
    
    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('loans')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Update user status
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select('-password')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get all loans for admin
export const getAllLoans = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit
    const status = req.query.status as string
    
    const filter = status ? { status } : {}
    
    const loans = await Loan.find(filter)
      .populate('user', 'firstName lastName email')
      .populate('documents')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
    
    const total = await Loan.countDocuments(filter)
    
    res.json({
      loans,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}