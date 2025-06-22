import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/User'

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' })
    }

    const decoded = jwt.verify(token, config.jwtSecret as string) as any
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(401).json({ message: 'Token is not valid' })
  }
}

export default auth