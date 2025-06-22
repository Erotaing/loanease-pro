import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Divider,
  Stack,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Upload,
  AttachMoney,
  Person,
  Work,
  Description
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/Layout';
import api from '../lib/api';
import { formatCurrency } from '../lib/utils';

interface LoanFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn: string;
  dateOfBirth: string;
  
  // Employment Information
  employmentType: string;
  employer: string;
  jobTitle: string;
  annualIncome: number;
  employmentDuration: string;
  
  // Loan Information
  loanAmount: number;
  loanPurpose: string;
  loanTerm: number;
  
  // Financial Information
  monthlyExpenses: number;
  existingDebts: number;
  creditScore: string;
}

const steps = [
  'Personal Information',
  'Employment Details',
  'Loan Information',
  'Financial Details',
  'Review & Submit'
];

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  ssn: Yup.string().required('SSN is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  employmentType: Yup.string().required('Employment type is required'),
  employer: Yup.string().required('Employer is required'),
  jobTitle: Yup.string().required('Job title is required'),
  annualIncome: Yup.number().min(1, 'Income must be greater than 0').required('Annual income is required'),
  employmentDuration: Yup.string().required('Employment duration is required'),
  loanAmount: Yup.number().min(1000, 'Minimum loan amount is $1,000').required('Loan amount is required'),
  loanPurpose: Yup.string().required('Loan purpose is required'),
  loanTerm: Yup.number().required('Loan term is required'),
  monthlyExpenses: Yup.number().min(0, 'Monthly expenses cannot be negative').required('Monthly expenses is required'),
  existingDebts: Yup.number().min(0, 'Existing debts cannot be negative').required('Existing debts is required'),
  creditScore: Yup.string().required('Credit score range is required')
});

const LoanApplication: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const formik = useFormik<LoanFormData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      ssn: '',
      dateOfBirth: '',
      employmentType: '',
      employer: '',
      jobTitle: '',
      annualIncome: 0,
      employmentDuration: '',
      loanAmount: 0,
      loanPurpose: '',
      loanTerm: 12,
      monthlyExpenses: 0,
      existingDebts: 0,
      creditScore: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      try {
        await api.post('/loans', values);
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to submit application');
      } finally {
        setLoading(false);
      }
    }
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="phone"
                label="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="ssn"
                label="Social Security Number"
                value={formik.values.ssn}
                onChange={formik.handleChange}
                error={formik.touched.ssn && Boolean(formik.errors.ssn)}
                helperText={formik.touched.ssn && formik.errors.ssn}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Employment Type</InputLabel>
                <Select
                  name="employmentType"
                  value={formik.values.employmentType}
                  onChange={formik.handleChange}
                  error={formik.touched.employmentType && Boolean(formik.errors.employmentType)}
                >
                  <MenuItem value="FULL_TIME">Full Time</MenuItem>
                  <MenuItem value="PART_TIME">Part Time</MenuItem>
                  <MenuItem value="SELF_EMPLOYED">Self Employed</MenuItem>
                  <MenuItem value="CONTRACT">Contract</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                name="employer"
                label="Employer"
                value={formik.values.employer}
                onChange={formik.handleChange}
                error={formik.touched.employer && Boolean(formik.errors.employer)}
                helperText={formik.touched.employer && formik.errors.employer}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                name="jobTitle"
                label="Job Title"
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
                error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                helperText={formik.touched.jobTitle && formik.errors.jobTitle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="annualIncome"
                label="Annual Income"
                type="number"
                value={formik.values.annualIncome}
                onChange={formik.handleChange}
                error={formik.touched.annualIncome && Boolean(formik.errors.annualIncome)}
                helperText={formik.touched.annualIncome && formik.errors.annualIncome}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="employmentDuration"
                label="Employment Duration (years)"
                value={formik.values.employmentDuration}
                onChange={formik.handleChange}
                error={formik.touched.employmentDuration && Boolean(formik.errors.employmentDuration)}
                helperText={formik.touched.employmentDuration && formik.errors.employmentDuration}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="loanAmount"
                label="Loan Amount"
                type="number"
                value={formik.values.loanAmount}
                onChange={formik.handleChange}
                error={formik.touched.loanAmount && Boolean(formik.errors.loanAmount)}
                helperText={formik.touched.loanAmount && formik.errors.loanAmount}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Loan Purpose</InputLabel>
                <Select
                  name="loanPurpose"
                  value={formik.values.loanPurpose}
                  onChange={formik.handleChange}
                  error={formik.touched.loanPurpose && Boolean(formik.errors.loanPurpose)}
                >
                  <MenuItem value="HOME_PURCHASE">Home Purchase</MenuItem>
                  <MenuItem value="DEBT_CONSOLIDATION">Debt Consolidation</MenuItem>
                  <MenuItem value="HOME_IMPROVEMENT">Home Improvement</MenuItem>
                  <MenuItem value="BUSINESS">Business</MenuItem>
                  <MenuItem value="EDUCATION">Education</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="loanTerm"
                label="Loan Term (months)"
                type="number"
                value={formik.values.loanTerm}
                onChange={formik.handleChange}
                error={formik.touched.loanTerm && Boolean(formik.errors.loanTerm)}
                helperText={formik.touched.loanTerm && formik.errors.loanTerm}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="monthlyExpenses"
                label="Monthly Expenses"
                type="number"
                value={formik.values.monthlyExpenses}
                onChange={formik.handleChange}
                error={formik.touched.monthlyExpenses && Boolean(formik.errors.monthlyExpenses)}
                helperText={formik.touched.monthlyExpenses && formik.errors.monthlyExpenses}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="existingDebts"
                label="Existing Debts"
                type="number"
                value={formik.values.existingDebts}
                onChange={formik.handleChange}
                error={formik.touched.existingDebts && Boolean(formik.errors.existingDebts)}
                helperText={formik.touched.existingDebts && formik.errors.existingDebts}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Credit Score Range</InputLabel>
                <Select
                  name="creditScore"
                  value={formik.values.creditScore}
                  onChange={formik.handleChange}
                  error={formik.touched.creditScore && Boolean(formik.errors.creditScore)}
                >
                  <MenuItem value="EXCELLENT">Excellent (750+)</MenuItem>
                  <MenuItem value="GOOD">Good (700-749)</MenuItem>
                  <MenuItem value="FAIR">Fair (650-699)</MenuItem>
                  <MenuItem value="POOR">Poor (600-649)</MenuItem>
                  <MenuItem value="VERY_POOR">Very Poor (Below 600)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Application
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="textSecondary">
                  Name: {formik.values.firstName} {formik.values.lastName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="textSecondary">
                  Email: {formik.values.email}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="textSecondary">
                  Loan Amount: {formatCurrency(formik.values.loanAmount || 0)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  if (success) {
    return (
      <Layout>
        <Container maxWidth="md">
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Application Submitted Successfully!
            </Typography>
            <Typography variant="body1" color="textSecondary">
              We'll review your application and get back to you within 24-48 hours.
            </Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Loan Application
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            {renderStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  endIcon={<CheckCircle />}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default LoanApplication;