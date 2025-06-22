import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  Search,
  Visibility,
  Edit,
  FilterList,
  Download,
  AttachMoney,
  Person,
  CalendarToday,
  TrendingUp,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import { formatCurrency, formatDate } from '../lib/utils';

interface Application {
  id: string;
  applicantName: string;
  email: string;
  loanAmount: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  applicationDate: string;
  creditScore: number;
  income: number;
  employmentStatus: string;
}

const Applications: React.FC = () => {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockApplications: Application[] = [
      {
        id: '1',
        applicantName: 'John Doe',
        email: 'john@example.com',
        loanAmount: 50000,
        purpose: 'Business Expansion',
        status: 'approved',
        applicationDate: '2024-01-15',
        creditScore: 750,
        income: 85000,
        employmentStatus: 'Full-time',
      },
      {
        id: '2',
        applicantName: 'Jane Smith',
        email: 'jane@example.com',
        loanAmount: 25000,
        purpose: 'Home Improvement',
        status: 'pending',
        applicationDate: '2024-01-20',
        creditScore: 680,
        income: 65000,
        employmentStatus: 'Full-time',
      },
      {
        id: '3',
        applicantName: 'Mike Johnson',
        email: 'mike@example.com',
        loanAmount: 75000,
        purpose: 'Debt Consolidation',
        status: 'under_review',
        applicationDate: '2024-01-22',
        creditScore: 720,
        income: 95000,
        employmentStatus: 'Self-employed',
      },
      {
        id: '4',
        applicantName: 'Sarah Wilson',
        email: 'sarah@example.com',
        loanAmount: 30000,
        purpose: 'Education',
        status: 'rejected',
        applicationDate: '2024-01-18',
        creditScore: 620,
        income: 45000,
        employmentStatus: 'Part-time',
      },
    ];
    
    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
    setLoading(false);
  }, []);

  // Filter applications based on search term and status
  useEffect(() => {
    let filtered = applications;
    
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.purpose.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }
    
    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, applications]);

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const handleViewApplication = (id: string) => {
    router.push(`/dashboard/loans/${id}`);
  };

  const stats = [
    {
      title: 'Total Applications',
      value: applications.length,
      icon: <Person />,
      color: 'primary',
    },
    {
      title: 'Pending Review',
      value: applications.filter((app) => app.status === 'pending').length,
      icon: <CalendarToday />,
      color: 'warning',
    },
    {
      title: 'Approved',
      value: applications.filter((app) => app.status === 'approved').length,
      icon: <TrendingUp />,
      color: 'success',
    },
    {
      title: 'Total Amount',
      value: formatCurrency(
        applications.reduce((sum, app) => sum + app.loanAmount, 0)
      ),
      icon: <AttachMoney />,
      color: 'info',
    },
  ];

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <LinearProgress />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Loan Applications
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and review all loan applications
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
          {stats.map((stat, index) => (
            <Box key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        bgcolor: `${stat.color}.light`,
                        color: `${stat.color}.main`,
                        mr: 2,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h6" component="div">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div" color={`${stat.color}.main`}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Filters and Search */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' }, gap: 2, alignItems: 'center' }}>
              <Box>
                <TextField
                  fullWidth
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  select
                  label="Status Filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </TextField>
              </Box>
              <Box>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => console.log('Export applications')}
                >
                  Export
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Applicant</TableCell>
                    <TableCell>Loan Amount</TableCell>
                    <TableCell>Purpose</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Application Date</TableCell>
                    <TableCell>Credit Score</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2">
                            {application.applicantName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {application.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {formatCurrency(application.loanAmount)}
                        </Typography>
                      </TableCell>
                      <TableCell>{application.purpose}</TableCell>
                      <TableCell>
                        <Chip
                          label={application.status.replace('_', ' ').toUpperCase()}
                          color={getStatusColor(application.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {formatDate(application.applicationDate)}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          color={
                            application.creditScore >= 700
                              ? 'success.main'
                              : application.creditScore >= 650
                              ? 'warning.main'
                              : 'error.main'
                          }
                        >
                          {application.creditScore}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => handleViewApplication(application.id)}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small">
                              <Edit />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            {filteredApplications.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No applications found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search criteria
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default Applications;