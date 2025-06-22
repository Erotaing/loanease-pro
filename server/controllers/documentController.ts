import { Request, Response } from 'express'
import Document from '../models/Document'
import Loan from '../models/Loan'
import axios from 'axios'
import config from '../config/config'

// Upload document
export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const { name, type, loanId, fileUrl } = req.body
    const userId = req.user.id
    
    // Check if loan exists and belongs to user
    if (loanId) {
      const loan = await Loan.findById(loanId)
      if (!loan) {
        return res.status(404).json({ message: 'Loan not found' })
      }
      
      if (loan.user.toString() !== userId && 
          req.user.role !== 'admin' && 
          req.user.role !== 'loan_officer') {
        return res.status(403).json({ message: 'Not authorized' })
      }
    }
    
    const document = new Document({
      user: userId,
      loan: loanId,
      name,
      type,
      fileUrl,
      mimeType: req.file?.mimetype,
      size: req.file?.size
    })
    
    await document.save()
    
    // If document is uploaded for a loan, add it to the loan's documents array
    if (loanId) {
      await Loan.findByIdAndUpdate(loanId, {
        $push: { documents: document._id }
      })
    }
    
    // Process document with OCR if it's an ID or income proof
    if (type === 'id_proof' || type === 'income_proof') {
      try {
        const ocrResponse = await axios.post(`${config.aiServiceUrl}/ocr/process`, {
          documentId: document._id,
          documentType: type,
          fileUrl
        })
        
        // Update document with OCR data
        document.ocrData = ocrResponse.data
        await document.save()
      } catch (ocrError) {
        console.error('OCR processing error:', ocrError)
        // Continue even if OCR fails
      }
    }
    
    res.status(201).json(document)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Get user documents
export const getUserDocuments = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id
    const documents = await Document.find({ user: userId })
      .sort({ uploadedAt: -1 })
    
    res.json(documents)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Get loan documents
export const getLoanDocuments = async (req: Request, res: Response) => {
  try {
    const { loanId } = req.params
    
    // Check if loan exists
    const loan = await Loan.findById(loanId)
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' })
    }
    
    // Check if user is authorized
    if (loan.user.toString() !== req.user.id && 
        req.user.role !== 'admin' && 
        req.user.role !== 'loan_officer') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    const documents = await Document.find({ loan: loanId })
      .sort({ uploadedAt: -1 })
    
    res.json(documents)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Verify document (for loan officers and admins)
export const verifyDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body
    
    // Check if user has permission
    if (req.user.role !== 'admin' && req.user.role !== 'loan_officer') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    const document = await Document.findById(id)
    if (!document) {
      return res.status(404).json({ message: 'Document not found' })
    }
    
    // Update document
    document.status = status
    document.verifiedBy = req.user.id
    document.verifiedAt = new Date()
    
    await document.save()
    
    res.json(document)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Get all documents for current user
export const getDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await Document.find({ user: req.user.id })
      .populate('loan', 'loanNumber')
      .sort({ uploadedAt: -1 })
    
    res.json(documents)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get document by ID
export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const document = await Document.findById(req.params.id)
      .populate('user', 'firstName lastName')
      .populate('loan', 'loanNumber')
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' })
    }
    
    // Check if user owns the document or is admin/loan officer
    if (document.user._id.toString() !== req.user.id && 
        req.user.role !== 'admin' && 
        req.user.role !== 'loan_officer') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    res.json(document)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Download document
export const downloadDocument = async (req: Request, res: Response) => {
  try {
    const document = await Document.findById(req.params.id)
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' })
    }
    
    // Check if user owns the document or is admin/loan officer
    if (document.user.toString() !== req.user.id && 
        req.user.role !== 'admin' && 
        req.user.role !== 'loan_officer') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    // In a real implementation, you would stream the file from storage
    // For now, return the file URL
    res.json({ downloadUrl: document.fileUrl })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Delete document
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const document = await Document.findById(req.params.id)
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' })
    }
    
    // Check if user owns the document or is admin
    if (document.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    await Document.findByIdAndDelete(req.params.id)
    
    // Remove document reference from loan if it exists
    if (document.loan) {
      await Loan.findByIdAndUpdate(document.loan, {
        $pull: { documents: document._id }
      })
    }
    
    res.json({ message: 'Document deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}