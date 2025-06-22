import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  LinearProgress
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  ArrowBack,
  Person,
  Email,
  Phone,
  Work,
  Home,
  AttachMoney,
  CalendarToday,
  Description,
  CheckCircle,
  Cancel,
  Pending,
  Download,
  Visibility,
  Edit,
  History,
  Assessment,
  Security,
  Warning
} from '@mui/icons-material';
import Layout from '../../components/Layout';
import Loader from '../../components/ui/Loader';
import { Button as CustomButton } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import api from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';
import {
  LOAN_STATUS,
  LOAN_STATUS_LABELS,
  LOAN_TYPES,
  LOAN_TYPE_LABELS,
  EMPLOYMENT_TYPES,
  DOCUMENT_TYPES
} from '../../lib/constants';
import { formatCurrency, formatDate } from '../../lib/utils';

interface LoanApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  loanType: string;
  amount: number;
  term: number;
  purpose: string;
  status: string;
  creditScore: number;
  monthlyIncome: number;
  employmentType: string;
  employmentDuration: number;
  existingDebts: number;
  collateral?: string;
  interestRate: number;
  monthlyPayment: number;
  applicationDate: string;
  lastUpdated: string;
  documents: Document[];
  riskAssessment: RiskAssessment;
  statusHistory: StatusHistory[];
  notes: Note[];
}

interface Document {
  id: string;
  type: string;
  name: string;
  url: string;
  uploadDate: string;
  verified: boolean;
}

interface RiskAssessment {
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  factors: string[];
  recommendation: string;
}

interface StatusHistory {
  id: string;
  status: string;
  changedBy: string;
  changeDate: string;
  reason?: string;
}

interface Note {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  type: 'INTERNAL' | 'APPLICANT';
}

const AdminLoanDetails: React.FC = () => {
  const [loan, setLoan] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusReason, setStatusReason] = useState('');
  const [newNote, setNewNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    if (id) {
      fetchLoanDetails();
    }
  }, [id]);

  const fetchLoanDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/loans/${id}`);
      setLoan(response.data);
    } catch (err: any) {
      console.error('Error fetching loan details:', err);
      setError('Failed to load loan details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!newStatus || !loan) return;

    try {
      setUpdating(true);
      await api.put(`/admin/loans/${loan.id}/status`, {
        status: newStatus,
        reason: statusReason
      });
      
      setStatusDialogOpen(false);
      setNewStatus('');
      setStatusReason('');
      fetchLoanDetails();
    } catch (err: any) {
      console.error('Error updating loan status:', err);
      setError('Failed to update loan status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() || !loan) return;

    try {
      setUpdating(true);
      await api.post(`/admin/loans/${loan.id}/notes`, {
        content: newNote,
        type: 'INTERNAL'
      });
      
      setNoteDialogOpen(false);
      setNewNote('');
      fetchLoanDetails();
    } catch (err: any) {
      console.error('Error adding note:', err);
      setError('Failed to add note. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      case 'under_review':
        return 'info';
      default:
        return 'default';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW':
        return 'success';
      case 'MEDIUM':
        return 'warning';
      case 'HIGH':
        return 'error';
      default:
        return 'default';
    }
  };

  const downloadDocument = async (documentId: string, fileName: string) => {
    try {
      const response = await api.get(`/admin/documents/${documentId}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading document:', err);
      setError('Failed to download document.');
    }
  };

  if (loading) {
    return (
      <Layout title="Loan Details - Admin">
        <Loader fullScreen message="Loading loan details..." />
      </Layout>
    );
  }

  if (error && !loan) {
    return (
      <Layout title="Loan Details - Admin">
        <Box className="flex flex-col items-center justify-center min-h-[400px]">
          <Warning className="text-red-500 text-6xl mb-4" />
          <Typography variant="h5" className="mb-2">
            Error Loading Loan
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mb-4">
            {error}
          </Typography>
          <CustomButton onClick={() => router.back()}>
            Go Back
          </CustomButton>
        </Box>
      </Layout>
    );
  }

  if (!loan) {
    return (
      <Layout title="Loan Details - Admin">
        <Box className="flex flex-col items-center justify-center min-h-[400px]">
          <Typography variant="h5" className="mb-4">
            Loan Not Found
          </Typography>
          <CustomButton onClick={() => router.back()}>
            Go Back
          </CustomButton>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title={`Loan #${loan.id} - Admin`}>
      {/* Header */}
      <Box className="mb-6">
        <Box className="flex items-center gap-4 mb-4">
          <IconButton onClick={() => router.back()} className="p-2">
            <ArrowBack />
          </IconButton>
          <Box className="flex-1">
            <Typography variant="h4" className="font-bold">
              Loan Application #{loan.id}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {loan.applicantName} • Applied {formatDate(loan.applicationDate)}
            </Typography>
          </Box>
          <Chip
            label={loan.status.replace('_', ' ').toUpperCase()}
            color={getStatusColor(loan.status) as any}
            size="medium"
            className="font-medium"
          />
        </Box>

        {error && (
          <Alert severity="error" className="mb-4" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Action Buttons */}
        <Box className="flex gap-2 flex-wrap">
          <CustomButton
            variant="default"
            onClick={() => setStatusDialogOpen(true)}
            disabled={updating}
          >
            Update Status
          </CustomButton>
          <CustomButton
            variant="secondary"
            onClick={() => setNoteDialogOpen(true)}
            disabled={updating}
          >
            Add Note
          </CustomButton>
          <CustomButton
            variant="outline"
            onClick={() => window.print()}
          >
            Print Details
          </CustomButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Applicant Information */}
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4 flex items-center gap-2">
                <Person className="text-blue-600" />
                Applicant Information
              </Typography>
              <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                  <Box className="space-y-3">
                    <Box className="flex items-center gap-2">
                      <Person className="text-gray-400" />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Full Name
                        </Typography>
                        <Typography variant="body1" className="font-medium">
                          {loan.applicantName}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Email className="text-gray-400" />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Email
                        </Typography>
                        <Typography variant="body1" className="font-medium">
                          {loan.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Phone className="text-gray-400" />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Phone
                        </Typography>
                        <Typography variant="body1" className="font-medium">
                          {loan.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box className="space-y-3">
                    <Box className="flex items-center gap-2">
                      <Work className="text-gray-400" />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Employment
                        </Typography>
                        <Typography variant="body1" className="font-medium">
                          {loan.employmentType} • {loan.employmentDuration} years
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <AttachMoney className="text-gray-400" />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Monthly Income
                        </Typography>
                        <Typography variant="body1" className="font-medium">
                          {formatCurrency(loan.monthlyIncome)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Assessment className="text-gray-400" />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Credit Score
                        </Typography>
                        <Typography variant="body1" className="font-medium">
                          {loan.creditScore}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Loan Details */}
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4 flex items-center gap-2">
                <Description className="text-green-600" />
                Loan Details
              </Typography>
              <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                  <Box className="space-y-3">
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Loan Type
                      </Typography>
                      <Typography variant="body1" className="font-medium">
                        {loan.loanType}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Amount Requested
                      </Typography>
                      <Typography variant="h6" className="font-bold text-green-600">
                        {formatCurrency(loan.amount)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Term
                      </Typography>
                      <Typography variant="body1" className="font-medium">
                        {loan.term} months
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box className="space-y-3">
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Interest Rate
                      </Typography>
                      <Typography variant="body1" className="font-medium">
                        {loan.interestRate}% APR
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Monthly Payment
                      </Typography>
                      <Typography variant="body1" className="font-medium">
                        {formatCurrency(loan.monthlyPayment)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Purpose
                      </Typography>
                      <Typography variant="body1" className="font-medium">
                        {loan.purpose}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Documents ({loan.documents.length})
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Document Type</TableCell>
                      <TableCell>File Name</TableCell>
                      <TableCell>Upload Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loan.documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{formatDate(doc.uploadDate)}</TableCell>
                        <TableCell>
                          <Chip
                            label={doc.verified ? 'Verified' : 'Pending'}
                            color={doc.verified ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box className="flex gap-1">
                            <Tooltip title="View Document">
                              <IconButton size="small">
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Download">
                              <IconButton
                                size="small"
                                onClick={() => downloadDocument(doc.id, doc.name)}
                              >
                                <Download />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Status History */}
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4 flex items-center gap-2">
                <History className="text-purple-600" />
                Status History
              </Typography>
              <List>
                {loan.statusHistory.map((history, index) => (
                  <React.Fragment key={history.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar className="w-8 h-8 bg-blue-100 text-blue-600">
                          {history.changedBy.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box className="flex items-center gap-2">
                            <Chip
                              label={history.status.replace('_', ' ').toUpperCase()}
                              color={getStatusColor(history.status) as any}
                              size="small"
                            />
                            <Typography variant="body2" color="textSecondary">
                              by {history.changedBy}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="textSecondary">
                              {formatDate(history.changeDate)}
                            </Typography>
                            {history.reason && (
                              <Typography variant="body2" className="mt-1">
                                Reason: {history.reason}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < loan.statusHistory.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Risk Assessment */}
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4 flex items-center gap-2">
                <Security className="text-orange-600" />
                Risk Assessment
              </Typography>
              <Box className="space-y-4">
                <Box>
                  <Box className="flex justify-between items-center mb-2">
                    <Typography variant="body2" color="textSecondary">
                      Risk Score
                    </Typography>
                    <Chip
                      label={loan.riskAssessment.level}
                      color={getRiskColor(loan.riskAssessment.level) as any}
                      size="small"
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={loan.riskAssessment.score}
                    className="h-2 rounded"
                    color={getRiskColor(loan.riskAssessment.level) as any}
                  />
                  <Typography variant="body2" className="mt-1">
                    {loan.riskAssessment.score}/100
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="textSecondary" className="mb-2">
                    Risk Factors
                  </Typography>
                  <Box className="space-y-1">
                    {loan.riskAssessment.factors.map((factor, index) => (
                      <Typography key={index} variant="body2" className="flex items-center gap-1">
                        • {factor}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="textSecondary" className="mb-2">
                    Recommendation
                  </Typography>
                  <Typography variant="body2">
                    {loan.riskAssessment.recommendation}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Internal Notes ({loan.notes.length})
              </Typography>
              <Box className="space-y-3 max-h-96 overflow-y-auto">
                {loan.notes.map((note) => (
                  <Paper key={note.id} className="p-3 bg-gray-50">
                    <Typography variant="body2" className="mb-2">
                      {note.content}
                    </Typography>
                    <Box className="flex justify-between items-center text-xs text-gray-500">
                      <span>{note.author}</span>
                      <span>{formatDate(note.createdAt)}</span>
                    </Box>
                  </Paper>
                ))}
                {loan.notes.length === 0 && (
                  <Typography variant="body2" color="textSecondary" className="text-center py-4">
                    No notes added yet
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Status Update Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Loan Status</DialogTitle>
        <DialogContent>
          <Box className="space-y-4 pt-2">
            <TextField
              select
              label="New Status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              fullWidth
            >
              {Object.entries(LOAN_STATUS).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Reason (Optional)"
              value={statusReason}
              onChange={(e) => setStatusReason(e.target.value)}
              multiline
              rows={3}
              fullWidth
              placeholder="Provide a reason for this status change..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleStatusUpdate}
            variant="contained"
            disabled={!newStatus || updating}
          >
            {updating ? 'Updating...' : 'Update Status'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Internal Note</DialogTitle>
        <DialogContent>
          <TextField
            label="Note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            multiline
            rows={4}
            fullWidth
            placeholder="Add an internal note about this loan application..."
            className="mt-2"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddNote}
            variant="contained"
            disabled={!newNote.trim() || updating}
          >
            {updating ? 'Adding...' : 'Add Note'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default AdminLoanDetails;