import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { formatDate, formatCurrency } from '../../../lib/utils';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  Stack,
  IconButton,
  Alert,
  LinearProgress,
  useTheme,
  alpha,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ArrowBack,
  Download,
  Edit,
  CheckCircle,
  Schedule,
  Cancel,
  Warning,
  AttachMoney,
  Person,
  Work,
  Description,
  Assessment,
  Email,
  Phone,
  CalendarToday,
  TrendingUp,
  AccountBalance,
  Security
} from '@mui/icons-material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import Layout from '../../../components/Layout';
import api from '../../../lib/api';

interface LoanData {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review' | 'funded';
  loanType: string;
  loanAmount: number;
  requestedTerm: number;
  interestRate?: number;
  monthlyPayment?: number;
  loanPurpose: string;
  applicationDate: string;
  lastUpdated: string;
  
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Employment Information
  employmentStatus: string;
  employerName: string;
  jobTitle: string;
  annualIncome: number;
  
  // Financial Information
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore: string;
  existingDebts: number;
  assets: number;
  
  // Risk Assessment
  riskScore?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  
  // Timeline
  timeline?: Array<{
    date: string;
    status: string;
    description: string;
    type: 'info' | 'success' | 'warning' | 'error';
  }>;
}

const LoanDetailsPage: React.FC = () => {
  const [loan, setLoan] = useState<LoanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();

  useEffect(() => {
    if (id) {
      fetchLoanDetails();
    }
  }, [id]);

  const fetchLoanDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/loans/${id}`);
      setLoan(response.data);
    } catch (error) {
      console.error('Error fetching loan details:', error);
      setError('Failed to load loan details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'funded':
        return 'success';
      case 'pending':
      case 'under-review':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'funded':
        return <CheckCircle />;
      case 'pending':
      case 'under-review':
        return <Schedule />;
      case 'rejected':
        return <Cancel />;
      default:
        return <Warning />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Layout title="Loading... - LoanEase Pro">
        <Container maxWidth="lg">
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <LinearProgress sx={{ mb: 4, borderRadius: 1 }} />
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Loading loan details...
            </Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  if (error || !loan) {
    return (
      <Layout title="Error - LoanEase Pro">
        <Container maxWidth="lg">
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
              {error || 'Loan not found'}
            </Alert>
            <Button 
              variant="contained" 
              onClick={() => router.push('/dashboard')}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Return to Dashboard
            </Button>
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout title={`Loan Application #${loan.id} - LoanEase Pro`}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton 
              onClick={() => router.push('/dashboard')}
              sx={{ mr: 2, color: 'primary.main' }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.900' }}>
              Loan Application #{loan.id}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={getStatusIcon(loan.status)}
              label={loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
              color={getStatusColor(loan.status) as any}
              sx={{ fontWeight: 600, fontSize: '0.9rem' }}
            />
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Applied on {formatDate(loan.applicationDate)}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Last updated: {formatDate(loan.lastUpdated)}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={4}>
              {/* Loan Overview */}
              <Card 
                sx={{
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                  color: 'white',
                  boxShadow: theme.shadows[8]
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <AttachMoney sx={{ fontSize: 32, mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {formatCurrency(loan.loanAmount)}
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                        Loan Type
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {loan.loanType.charAt(0).toUpperCase() + loan.loanType.slice(1)} Loan
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                        Term
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {loan.requestedTerm} months
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                        Interest Rate
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {loan.interestRate ? `${loan.interestRate}%` : 'TBD'}
                      </Typography>
                    </Grid>
                  </Grid>
                  {loan.monthlyPayment && (
                    <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                      <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                        Estimated Monthly Payment
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatCurrency(loan.monthlyPayment)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[4] }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Person sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.900' }}>
                      Personal Information
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <Person sx={{ color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Full Name"
                            secondary={`${loan.firstName} ${loan.lastName}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Email sx={{ color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Email"
                            secondary={loan.email}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Phone sx={{ color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Phone"
                            secondary={loan.phone}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarToday sx={{ color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Date of Birth"
                            secondary={formatDate(loan.dateOfBirth)}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Work sx={{ color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Employment"
                            secondary={loan.employmentStatus}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <TrendingUp sx={{ color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Annual Income"
                            secondary={formatCurrency(loan.annualIncome)}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Financial Summary */}
              <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[4] }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <AccountBalance sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.900' }}>
                      Financial Summary
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                          {formatCurrency(loan.monthlyIncome)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'success.700' }}>
                          Monthly Income
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.50', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.main' }}>
                          {formatCurrency(loan.monthlyExpenses)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'warning.700' }}>
                          Monthly Expenses
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.50', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'info.main' }}>
                          {loan.creditScore}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'info.700' }}>
                          Credit Score
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {formatCurrency(loan.assets)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'primary.700' }}>
                          Total Assets
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Loan Purpose */}
              <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[4] }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Description sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.900' }}>
                      Loan Purpose
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
                    {loan.loanPurpose}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={4}>
              {/* Risk Assessment */}
              {loan.riskScore && (
                <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[4] }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Security sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.900' }}>
                        Risk Assessment
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        {loan.riskScore}
                      </Typography>
                      <Chip
                        label={loan.riskLevel?.toUpperCase()}
                        color={getRiskColor(loan.riskLevel || '') as any}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={loan.riskScore}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Application Timeline */}
              <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[4] }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.900', mb: 3 }}>
                    Application Timeline
                  </Typography>
                  <Timeline>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary">
                          <Description />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Application Submitted
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {formatDate(loan.applicationDate)}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                    
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="warning">
                          <Assessment />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Under Review
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          In progress
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                    
                    {loan.status === 'approved' && (
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot color="success">
                            <CheckCircle />
                          </TimelineDot>
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Approved
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {formatDate(loan.lastUpdated)}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    )}
                  </Timeline>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[4] }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.900', mb: 3 }}>
                    Actions
                  </Typography>
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        borderColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1)
                        }
                      }}
                    >
                      Download Application
                    </Button>
                    
                    {loan.status === 'pending' && (
                      <Button
                        variant="contained"
                        startIcon={<Edit />}
                        fullWidth
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          fontWeight: 600
                        }}
                      >
                        Edit Application
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default LoanDetailsPage;