import { Request, Response } from 'express'
import User from '../models/User'
import Loan from '../models/Loan'

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, address } = req.body
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, email, phone, address },
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

// Delete user account
export const deleteUserAccount = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ message: 'Account deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get user's loans
export const getUserLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find({ user: req.user.id })
      .populate('documents')
      .sort({ createdAt: -1 })
    
    res.json(loans)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}