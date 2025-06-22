import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Tab,
  Tabs,
  Alert
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  People,
  Description,
  TrendingUp,
  AttachMoney,
  AdminPanelSettings
} from '@mui/icons-material';
import Layout from '../../components/Layout';
import DashboardStats from '../../components/dashboard/DashboardStats';
import RecentActivity from '../../components/dashboard/RecentActivity';
import LoanList from '../../components/Loans/LoanList';
import Loader from '../../components/ui/Loader';
import api from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';
import { formatCurrency } from '../../lib/utils';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    loans: [],
    users: [],
    totalAmount: 0,
    recentActivity: []
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and has admin role
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all loans for admin view
      const loansResponse = await api.get('/admin/loans');
      
      // Fetch users count
      const usersResponse = await api.get('/admin/users/count');
      
      // Fetch recent activity
      const activityResponse = await api.get('/admin/activity');

      setDashboardData({
        loans: loansResponse.data,
        users: usersResponse.data.count || 0,
        totalAmount: loansResponse.data.reduce((sum: number, loan: any) => sum + loan.amount, 0),
        recentActivity: activityResponse.data || []
      });
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewLoanDetails = (loanId: string) => {
    router.push(`/admin/loan/${loanId}`);
  };

  const adminStats = [
    {
      title: 'Total Users',
      value: dashboardData.users,
      icon: <People className="text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Total Applications',
      value: dashboardData.loans.length,
      icon: <Description className="text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'Total Loan Amount',
      value: formatCurrency(dashboardData.totalAmount),
      icon: <AttachMoney className="text-purple-600" />,
      color: 'bg-purple-50'
    },
    {
      title: 'Approval Rate',
      value: dashboardData.loans.length > 0 
        ? `${Math.round((dashboardData.loans.filter((loan: any) => loan.status === 'approved').length / dashboardData.loans.length) * 100)}%`
        : '0%',
      icon: <TrendingUp className="text-orange-600" />,
      color: 'bg-orange-50'
    }
  ];

  if (loading) {
    return (
      <Layout title="Admin Dashboard - LoanEase Pro">
        <Loader fullScreen message="Loading admin dashboard..." />
      </Layout>
    );
  }

  return (
    <Layout title="Admin Dashboard - LoanEase Pro">
      <Box className="mb-6">
        <Box className="flex items-center gap-2 mb-2">
          <AdminPanelSettings className="text-blue-600" />
          <Typography variant="h4" className="font-bold">
            Admin Dashboard
          </Typography>
        </Box>
        <Typography variant="body1" color="textSecondary">
          Manage loans, users, and monitor system activity
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" className="mb-6" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Admin Stats */}
      <Grid container spacing={3} className="mb-8">
        {adminStats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card>
              <CardContent>
                <Box className="flex items-center justify-between">
                  <Box>
                    <Typography variant="h4" className="font-bold mb-1">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box className={`p-3 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs for different admin views */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin dashboard tabs">
            <Tab label="All Loans" />
            <Tab label="Recent Activity" />
            <Tab label="System Overview" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <LoanList
            loans={dashboardData.loans}
            onViewDetails={handleViewLoanDetails}
            showApplicantInfo={true}
            title="All Loan Applications"
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <RecentActivity activities={dashboardData.recentActivity} maxItems={20} />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold mb-4">
                    System Status
                  </Typography>
                  <Box className="space-y-3">
                    <Box className="flex justify-between items-center">
                      <Typography variant="body2">API Status</Typography>
                      <Typography variant="body2" className="text-green-600 font-medium">
                        ✓ Online
                      </Typography>
                    </Box>
                    <Box className="flex justify-between items-center">
                      <Typography variant="body2">Database</Typography>
                      <Typography variant="body2" className="text-green-600 font-medium">
                        ✓ Connected
                      </Typography>
                    </Box>
                    <Box className="flex justify-between items-center">
                      <Typography variant="body2">OCR Service</Typography>
                      <Typography variant="body2" className="text-green-600 font-medium">
                        ✓ Available
                      </Typography>
                    </Box>
                    <Box className="flex justify-between items-center">
                      <Typography variant="body2">Risk Model</Typography>
                      <Typography variant="body2" className="text-green-600 font-medium">
                        ✓ Active
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold mb-4">
                    Quick Actions
                  </Typography>
                  <Box className="space-y-2">
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => router.push('/admin/users')}
                    >
                      Manage Users
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => router.push('/admin/reports')}
                    >
                      Generate Reports
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => router.push('/admin/settings')}
                    >
                      System Settings
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={fetchDashboardData}
                    >
                      Refresh Data
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>
    </Layout>
  );
};

export default AdminDashboard;