import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { formatCurrency, formatDate } from '../lib/utils';
import Layout from '../components/Layout';

interface Borrower {
  id: string;
  name: string;
  email: string;
  phone: string;
  creditScore: number;
  totalLoans: number;
  activeLoans: number;
  totalBorrowed: number;
  status: 'active' | 'inactive' | 'defaulted' | 'pending';
  joinDate: string;
  lastActivity: string;
  riskLevel: 'low' | 'medium' | 'high';
}

const mockBorrowers: Borrower[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    creditScore: 750,
    totalLoans: 3,
    activeLoans: 1,
    totalBorrowed: 125000,
    status: 'active',
    joinDate: '2023-01-15',
    lastActivity: '2024-01-10',
    riskLevel: 'low',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    creditScore: 680,
    totalLoans: 2,
    activeLoans: 2,
    totalBorrowed: 85000,
    status: 'active',
    joinDate: '2023-03-22',
    lastActivity: '2024-01-08',
    riskLevel: 'medium',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1 (555) 345-6789',
    creditScore: 620,
    totalLoans: 1,
    activeLoans: 0,
    totalBorrowed: 45000,
    status: 'inactive',
    joinDate: '2023-06-10',
    lastActivity: '2023-12-15',
    riskLevel: 'high',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 456-7890',
    creditScore: 720,
    totalLoans: 4,
    activeLoans: 2,
    totalBorrowed: 200000,
    status: 'active',
    joinDate: '2022-11-05',
    lastActivity: '2024-01-12',
    riskLevel: 'low',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '+1 (555) 567-8901',
    creditScore: 580,
    totalLoans: 2,
    activeLoans: 0,
    totalBorrowed: 75000,
    status: 'defaulted',
    joinDate: '2023-08-18',
    lastActivity: '2023-11-20',
    riskLevel: 'high',
  },
];

const BorrowersPage: React.FC = () => {
  const [borrowers, setBorrowers] = useState<Borrower[]>(mockBorrowers);
  const [filteredBorrowers, setFilteredBorrowers] = useState<Borrower[]>(mockBorrowers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let filtered = borrowers;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (borrower) =>
          borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          borrower.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          borrower.phone.includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((borrower) => borrower.status === statusFilter);
    }

    // Apply risk filter
    if (riskFilter !== 'all') {
      filtered = filtered.filter((borrower) => borrower.riskLevel === riskFilter);
    }

    setFilteredBorrowers(filtered);
  }, [borrowers, searchTerm, statusFilter, riskFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'defaulted':
        return 'error';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
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

  const getCreditScoreColor = (score: number) => {
    if (score >= 700) return '#4caf50';
    if (score >= 650) return '#ff9800';
    return '#f44336';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleExport = () => {
    console.log('Exporting borrower data...');
  };

  const totalBorrowers = borrowers.length;
  const activeBorrowers = borrowers.filter((b) => b.status === 'active').length;
  const totalPortfolio = borrowers.reduce((sum, b) => sum + b.totalBorrowed, 0);
  const averageCreditScore = Math.round(
    borrowers.reduce((sum, b) => sum + b.creditScore, 0) / borrowers.length
  );

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Borrower Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and monitor all borrowers in your lending portfolio
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
        <Box>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Borrowers</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {totalBorrowers}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Active Borrowers</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {activeBorrowers}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Portfolio</Typography>
              </Box>
              <Typography variant="h4" color="info.main">
                {formatCurrency(totalPortfolio)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Avg Credit Score</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {averageCreditScore}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' }, gap: 3, alignItems: 'center' }}>
            <Box>
              <TextField
                fullWidth
                placeholder="Search borrowers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="defaulted">Defaulted</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel>Risk Level</InputLabel>
                <Select
                  value={riskFilter}
                  label="Risk Level"
                  onChange={(e) => setRiskFilter(e.target.value)}
                >
                  <MenuItem value="all">All Risk Levels</MenuItem>
                  <MenuItem value="low">Low Risk</MenuItem>
                  <MenuItem value="medium">Medium Risk</MenuItem>
                  <MenuItem value="high">High Risk</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExport}
              >
                Export
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Borrowers Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Borrower</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Credit Score</TableCell>
                  <TableCell>Loans</TableCell>
                  <TableCell>Total Borrowed</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Risk Level</TableCell>
                  <TableCell>Last Activity</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBorrowers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No borrowers found matching your criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBorrowers.map((borrower) => (
                    <TableRow key={borrower.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{
                              mr: 2,
                              bgcolor: 'primary.main',
                              color: 'white',
                            }}
                          >
                            {getInitials(borrower.name)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">
                              {borrower.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {borrower.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">
                            {borrower.email}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {borrower.phone}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: getCreditScoreColor(borrower.creditScore) }}
                        >
                          {borrower.creditScore}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">
                            Active: {borrower.activeLoans}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Total: {borrower.totalLoans}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {formatCurrency(borrower.totalBorrowed)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={borrower.status.charAt(0).toUpperCase() + borrower.status.slice(1)}
                          color={getStatusColor(borrower.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={borrower.riskLevel.charAt(0).toUpperCase() + borrower.riskLevel.slice(1)}
                          color={getRiskColor(borrower.riskLevel) as any}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(borrower.lastActivity)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton size="small" color="primary">
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Borrower">
                            <IconButton size="small" color="secondary">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      </Container>
    </Layout>
  );
};

export default BorrowersPage;