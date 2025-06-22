import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import User from '../models/User'
import config from '../config/config'

// Register new user
export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role } = req.body
    
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    
    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role: role || 'borrower'
    })
    
    await user.save()
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret as Secret,
      { expiresIn: config.jwtExpiresIn } as SignOptions
    )
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    
    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    
    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret as Secret,
      { expiresIn: config.jwtExpiresIn } as SignOptions
    )

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}