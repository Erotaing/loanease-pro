import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  useTheme,
  alpha
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Person,
  AccountBalance,
  Assessment
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface LoanFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn: string;
  dateOfBirth: string;
  loanType: string;
  loanAmount: number;
  loanPurpose: string;
  employmentStatus: string;
  employer: string;
  jobTitle: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore: number;
  assets: number;
  liabilities: number;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  ssn: Yup.string().required('SSN is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  loanType: Yup.string().required('Loan type is required'),
  loanAmount: Yup.number().min(1000, 'Minimum loan amount is $1,000').required('Loan amount is required'),
  loanPurpose: Yup.string().required('Loan purpose is required'),
  employmentStatus: Yup.string().required('Employment status is required'),
  employer: Yup.string().required('Employer is required'),
  jobTitle: Yup.string().required('Job title is required'),
  monthlyIncome: Yup.number().min(0, 'Income must be positive').required('Monthly income is required'),
  monthlyExpenses: Yup.number().min(0, 'Expenses must be positive').required('Monthly expenses is required'),
  creditScore: Yup.number().min(300, 'Invalid credit score').max(850, 'Invalid credit score').required('Credit score is required'),
  assets: Yup.number().min(0, 'Assets must be positive').required('Assets is required'),
  liabilities: Yup.number().min(0, 'Liabilities must be positive').required('Liabilities is required')
});

const steps = ['Personal Information', 'Loan Details', 'Financial Information'];

const NewLoanApplication: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik<LoanFormData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      ssn: '',
      dateOfBirth: '',
      loanType: '',
      loanAmount: 0,
      loanPurpose: '',
      employmentStatus: '',
      employer: '',
      jobTitle: '',
      monthlyIncome: 0,
      monthlyExpenses: 0,
      creditScore: 0,
      assets: 0,
      liabilities: 0
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        const response = await fetch('/api/loans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Failed to submit loan application');
        }

        const result = await response.json();
        router.push(`/dashboard/loans/${result.id}`);
      } catch (error) {
        setSubmitError('Failed to submit loan application. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderPersonalInformation = () => (
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
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
          helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          InputLabelProps={{ shrink: true }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Grid>
    </Grid>
  );

  const renderLoanDetails = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          select
          name="loanType"
          label="Loan Type"
          value={formik.values.loanType}
          onChange={formik.handleChange}
          error={formik.touched.loanType && Boolean(formik.errors.loanType)}
          helperText={formik.touched.loanType && formik.errors.loanType}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        >
          <MenuItem value="personal">Personal Loan</MenuItem>
          <MenuItem value="auto">Auto Loan</MenuItem>
          <MenuItem value="home">Home Loan</MenuItem>
          <MenuItem value="business">Business Loan</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="loanAmount"
          label="Loan Amount"
          type="number"
          value={formik.values.loanAmount}
          onChange={formik.handleChange}
          error={formik.touched.loanAmount && Boolean(formik.errors.loanAmount)}
          helperText={formik.touched.loanAmount && formik.errors.loanAmount}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="loanPurpose"
          label="Loan Purpose"
          value={formik.values.loanPurpose}
          onChange={formik.handleChange}
          error={formik.touched.loanPurpose && Boolean(formik.errors.loanPurpose)}
          helperText={formik.touched.loanPurpose && formik.errors.loanPurpose}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          select
          name="employmentStatus"
          label="Employment Status"
          value={formik.values.employmentStatus}
          onChange={formik.handleChange}
          error={formik.touched.employmentStatus && Boolean(formik.errors.employmentStatus)}
          helperText={formik.touched.employmentStatus && formik.errors.employmentStatus}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        >
          <MenuItem value="employed">Employed</MenuItem>
          <MenuItem value="self-employed">Self-Employed</MenuItem>
          <MenuItem value="unemployed">Unemployed</MenuItem>
          <MenuItem value="retired">Retired</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="employer"
          label="Employer"
          value={formik.values.employer}
          onChange={formik.handleChange}
          error={formik.touched.employer && Boolean(formik.errors.employer)}
          helperText={formik.touched.employer && formik.errors.employer}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="jobTitle"
          label="Job Title"
          value={formik.values.jobTitle}
          onChange={formik.handleChange}
          error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
          helperText={formik.touched.jobTitle && formik.errors.jobTitle}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Grid>
    </Grid>
  );

  const renderFinancialInformation = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="monthlyIncome"
          label="Monthly Income"
          type="number"
          value={formik.values.monthlyIncome}
          onChange={formik.handleChange}
          error={formik.touched.monthlyIncome && Boolean(formik.errors.monthlyIncome)}
          helperText={formik.touched.monthlyIncome && formik.errors.monthlyIncome}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Grid>
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
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="creditScore"
          label="Credit Score"
          type="number"
          value={formik.values.creditScore}
          onChange={formik.handleChange}
          error={formik.touched.creditScore && Boolean(formik.errors.creditScore)}
          helperText={formik.touched.creditScore && formik.errors.creditScore}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="assets"
          label="Total Assets"
          type="number"
          value={formik.values.assets}
          onChange={formik.handleChange}
          error={formik.touched.assets && Boolean(formik.errors.assets)}
          helperText={formik.touched.assets && formik.errors.assets}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="liabilities"
          label="Total Liabilities"
          type="number"
          value={formik.values.liabilities}
          onChange={formik.handleChange}
          error={formik.touched.liabilities && Boolean(formik.errors.liabilities)}
          helperText={formik.touched.liabilities && formik.errors.liabilities}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Grid>
    </Grid>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderPersonalInformation();
      case 1:
        return renderLoanDetails();
      case 2:
        return renderFinancialInformation();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/dashboard/loans')}
          sx={{ mb: 2 }}
        >
          Back to Loans
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          New Loan Application
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Complete the form below to submit your loan application
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: theme.shadows[4] }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={formik.handleSubmit}>
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              {getStepContent(activeStep)}
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default NewLoanApplication;
 
