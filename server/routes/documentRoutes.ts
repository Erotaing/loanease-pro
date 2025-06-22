import express from 'express'
import {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument,
  downloadDocument
} from '../controllers/documentController'
import auth from '../middleware/auth'

const router = express.Router()

// All routes require authentication
router.use(auth)

// Document operations
router.post('/upload', uploadDocument)
router.get('/', getDocuments)
router.get('/:id', getDocumentById)
router.get('/:id/download', downloadDocument)
router.delete('/:id', deleteDocument)

export default router