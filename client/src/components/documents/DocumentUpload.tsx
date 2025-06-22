import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import api from '../../lib/api'

interface DocumentUploadProps {
  loanId?: string
  onUploadComplete?: (document: any) => void
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
  loanId, 
  onUploadComplete 
}) => {
  const [uploading, setUploading] = useState(false)
  const [documentName, setDocumentName] = useState('')
  const [documentType, setDocumentType] = useState('')
  
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': []
    },
    maxFiles: 1
  })
  
  const handleUpload = async () => {
    if (!documentName || !documentType || acceptedFiles.length === 0) {
      toast.error('Please fill all fields and select a file')
      return
    }
    
    setUploading(true)
    
    try {
      // Create form data
      const formData = new FormData()
      formData.append('file', acceptedFiles[0])
      formData.append('name', documentName)
      formData.append('type', documentType)
      if (loanId) formData.append('loanId', loanId)
      
      // Upload file
      const response = await api.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      toast.success('Document uploaded successfully')
      
      // Reset form
      setDocumentName('')
      setDocumentType('')
      // Note: acceptedFiles will be cleared when user selects new files
      
      // Callback
      if (onUploadComplete) {
        onUploadComplete(response.data)
      }
    } catch (error) {
      console.error('Error uploading document:', error)
      toast.error('Failed to upload document')
    } finally {
      setUploading(false)
    }
  }
  
  const documentTypes = [
    { value: 'id_proof', label: 'ID Proof' },
    { value: 'income_proof', label: 'Income Proof' },
    { value: 'address_proof', label: 'Address Proof' },
    { value: 'bank_statement', label: 'Bank Statement' },
    { value: 'tax_return', label: 'Tax Return' },
    { value: 'other', label: 'Other' }
  ]
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Upload Document</h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="documentName">
          Document Name
        </label>
        <input
          id="documentName"
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter document name"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="documentType">
          Document Type
        </label>
        <select
          id="documentType"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <option value="">Select document type</option>
          {documentTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <div 
          {...getRootProps()} 
          className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
        >
          <input {...getInputProps()} />
          {acceptedFiles.length > 0 ? (
            <div>
              <p className="text-green-600 font-medium">
                Selected file: {acceptedFiles[0].name}
              </p>
              <p className="text-gray-500 text-sm">
                {(acceptedFiles[0].size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              Drag & drop a file here, or click to select a file
            </p>
          )}
        </div>
      </div>
      
      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Document'}
      </button>
    </div>
  )
}

export default DocumentUpload