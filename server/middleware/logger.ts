import { Request, Response, NextFunction } from 'express'

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString()
  const method = req.method
  const url = req.originalUrl
  const ip = req.ip || req.connection.remoteAddress
  
  console.log(`[${timestamp}] ${method} ${url} - ${ip}`)
  
  // Log response time
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    const statusCode = res.statusCode
    const statusColor = statusCode >= 400 ? '\x1b[31m' : statusCode >= 300 ? '\x1b[33m' : '\x1b[32m'
    
    console.log(`[${timestamp}] ${method} ${url} - ${statusColor}${statusCode}\x1b[0m - ${duration}ms`)
  })
  
  next()
}