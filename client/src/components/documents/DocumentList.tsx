import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Description,
  PictureAsPdf,
  Image,
  Download,
  Delete,
  Visibility,
  CloudUpload
} from '@mui/icons-material';
import { format } from 'date-fns';

interface Document {
  _id: string;
  name: string;
  type: 'id_proof' | 'income_proof' | 'bank_statement' | 'tax_return' | 'other';
  fileUrl: string;
  mimeType?: string;
  size?: number;
  uploadedAt: string;
  status?: 'pending' | 'verified' | 'rejected';
  ocrData?: any;
}

interface DocumentListProps {
  documents: Document[];
  onDownload?: (document: Document) => void;
  onDelete?: (documentId: string) => void;
  onView?: (document: Document) => void;
  allowDelete?: boolean;
  showUploadButton?: boolean;
  onUpload?: () => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDownload,
  onDelete,
  onView,
  allowDelete = false,
  showUploadButton = false,
  onUpload
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  const getDocumentIcon = (mimeType?: string) => {
    if (!mimeType) return <Description />;
    
    if (mimeType.includes('pdf')) {
      return <PictureAsPdf className="text-red-600" />;
    } else if (mimeType.includes('image')) {
      return <Image className="text-blue-600" />;
    } else {
      return <Description className="text-gray-600" />;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'id_proof':
        return 'ID Proof';
      case 'income_proof':
        return 'Income Proof';
      case 'bank_statement':
        return 'Bank Statement';
      case 'tax_return':
        return 'Tax Return';
      default:
        return 'Other';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'warning';
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDeleteClick = (documentId: string) => {
    setDocumentToDelete(documentId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (documentToDelete && onDelete) {
      onDelete(documentToDelete);
    }
    setDeleteDialogOpen(false);
    setDocumentToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDocumentToDelete(null);
  };

  return (
    <Card>
      <CardContent>
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h6" className="font-semibold">
            Documents ({documents.length})
          </Typography>
          {showUploadButton && onUpload && (
            <Button
              variant="outlined"
              startIcon={<CloudUpload />}
              onClick={onUpload}
              size="small"
            >
              Upload Document
            </Button>
          )}
        </Box>

        {documents.length === 0 ? (
          <Box className="text-center py-8">
            <CloudUpload className="text-gray-400 text-6xl mb-4" />
            <Typography variant="h6" color="textSecondary" className="mb-2">
              No documents uploaded
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Upload your documents to get started with your loan application.
            </Typography>
            {showUploadButton && onUpload && (
              <Button
                variant="contained"
                startIcon={<CloudUpload />}
                onClick={onUpload}
                className="mt-4"
              >
                Upload First Document
              </Button>
            )}
          </Box>
        ) : (
          <List>
            {documents.map((document, index) => (
              <ListItem key={document._id} divider={index < documents.length - 1}>
                <ListItemIcon>
                  {getDocumentIcon(document.mimeType)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box className="flex items-center gap-2 flex-wrap">
                      <Typography variant="body1" className="font-medium">
                        {document.name}
                      </Typography>
                      <Chip
                        label={getDocumentTypeLabel(document.type)}
                        size="small"
                        variant="outlined"
                      />
                      {document.status && (
                        <Chip
                          label={document.status}
                          size="small"
                          color={getStatusColor(document.status) as any}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box className="mt-1">
                      <Typography variant="caption" color="textSecondary">
                        {formatFileSize(document.size)} • 
                        Uploaded {format(new Date(document.uploadedAt), 'MMM dd, yyyy')}
                      </Typography>
                      {document.ocrData && (
                        <Typography variant="caption" color="primary" className="block">
                          ✓ OCR processed
                        </Typography>
                      )}
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Box className="flex gap-1">
                    {onView && (
                      <IconButton
                        edge="end"
                        onClick={() => onView(document)}
                        size="small"
                        title="View document"
                      >
                        <Visibility />
                      </IconButton>
                    )}
                    {onDownload && (
                      <IconButton
                        edge="end"
                        onClick={() => onDownload(document)}
                        size="small"
                        title="Download document"
                      >
                        <Download />
                      </IconButton>
                    )}
                    {allowDelete && onDelete && (
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteClick(document._id)}
                        size="small"
                        title="Delete document"
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Document</DialogTitle>
        <DialogContent>
          <Alert severity="warning" className="mb-4">
            Are you sure you want to delete this document? This action cannot be undone.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default DocumentList;