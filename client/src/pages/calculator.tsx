import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  Divider,
  InputAdornment,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Calculate as CalculateIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  Assessment as AssessmentIcon,
  Info as InfoIcon,
  AccountBalance,
  Group,
  Star,
  Speed,
  CheckCircle,
  Verified,
  ArrowForward,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '../components/Layout';
import { formatCurrency } from '../lib/utils';

interface LoanCalculation {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  paymentSchedule: PaymentScheduleItem[];
}

interface PaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface LoanScenario {
  name: string;
  amount: number;
  term: number;
  rate: number;
  monthlyPayment: number;
  totalInterest: number;
}

const LoanCalculator: React.FC = () => {
  const theme = useTheme();
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [loanTerm, setLoanTerm] = useState<number>(60); // months
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [loanType, setLoanType] = useState<string>('personal');
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null);
  const [scenarios, setScenarios] = useState<LoanScenario[]>([]);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  // Loan type configurations
  const loanTypes = {
    personal: { min: 1000, max: 100000, minRate: 5.99, maxRate: 35.99, minTerm: 12, maxTerm: 84 },
    auto: { min: 5000, max: 150000, minRate: 3.99, maxRate: 18.99, minTerm: 24, maxTerm: 84 },
    home: { min: 50000, max: 1000000, minRate: 3.25, maxRate: 8.99, minTerm: 120, maxTerm: 360 },
    business: { min: 10000, max: 500000, minRate: 6.99, maxRate: 25.99, minTerm: 12, maxTerm: 120 },
  };

  const calculateLoan = (): LoanCalculation => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;
    
    // Calculate monthly payment using the formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanAmount;
    
    // Generate payment schedule
    const paymentSchedule: PaymentScheduleItem[] = [];
    let remainingBalance = loanAmount;
    
    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      paymentSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance),
      });
    }
    
    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      paymentSchedule,
    };
  };

  useEffect(() => {
    if (loanAmount > 0 && loanTerm > 0 && interestRate > 0) {
      const result = calculateLoan();
      setCalculation(result);
    }
  }, [loanAmount, loanTerm, interestRate]);

  const handleLoanTypeChange = (type: string) => {
    setLoanType(type);
    const config = loanTypes[type as keyof typeof loanTypes];
    
    // Adjust values to fit the loan type constraints
    if (loanAmount < config.min) setLoanAmount(config.min);
    if (loanAmount > config.max) setLoanAmount(config.max);
    if (loanTerm < config.minTerm) setLoanTerm(config.minTerm);
    if (loanTerm > config.maxTerm) setLoanTerm(config.maxTerm);
    if (interestRate < config.minRate) setInterestRate(config.minRate);
    if (interestRate > config.maxRate) setInterestRate(config.maxRate);
  };

  const addScenario = () => {
    if (calculation) {
      const scenario: LoanScenario = {
        name: `${loanType.charAt(0).toUpperCase() + loanType.slice(1)} Loan - ${formatCurrency(loanAmount)}`,
        amount: loanAmount,
        term: loanTerm,
        rate: interestRate,
        monthlyPayment: calculation.monthlyPayment,
        totalInterest: calculation.totalInterest,
      };
      setScenarios([...scenarios, scenario]);
    }
  };

  const removeScenario = (index: number) => {
    setScenarios(scenarios.filter((_, i) => i !== index));
  };

  const currentConfig = loanTypes[loanType as keyof typeof loanTypes];

  return (
    <Layout title="Loan Calculator - LoanEase Pro">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Loan Calculator
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Calculate your loan payments and compare different scenarios
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Get instant estimates for monthly payments, total interest, and payment schedules
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Calculator Input Panel */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Card sx={{ height: 'fit-content', borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CalculateIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Loan Details
                  </Typography>
                </Box>

                {/* Loan Type Selection */}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Loan Type</InputLabel>
                  <Select
                    value={loanType}
                    label="Loan Type"
                    onChange={(e) => handleLoanTypeChange(e.target.value)}
                  >
                    <MenuItem value="personal">Personal Loan</MenuItem>
                    <MenuItem value="auto">Auto Loan</MenuItem>
                    <MenuItem value="home">Home Loan</MenuItem>
                    <MenuItem value="business">Business Loan</MenuItem>
                  </Select>
                </FormControl>

                {/* Loan Amount */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Loan Amount: {formatCurrency(loanAmount)}
                  </Typography>
                  <Slider
                    value={loanAmount}
                    onChange={(_, value) => setLoanAmount(value as number)}
                    min={currentConfig.min}
                    max={currentConfig.max}
                    step={1000}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => formatCurrency(value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    inputProps={{
                      min: currentConfig.min,
                      max: currentConfig.max,
                      step: 1000,
                    }}
                  />
                </Box>

                {/* Loan Term */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Loan Term: {loanTerm} months ({Math.round(loanTerm / 12 * 10) / 10} years)
                  </Typography>
                  <Slider
                    value={loanTerm}
                    onChange={(_, value) => setLoanTerm(value as number)}
                    min={currentConfig.minTerm}
                    max={currentConfig.maxTerm}
                    step={6}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} months`}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">months</InputAdornment>,
                    }}
                    inputProps={{
                      min: currentConfig.minTerm,
                      max: currentConfig.maxTerm,
                      step: 1,
                    }}
                  />
                </Box>

                {/* Interest Rate */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Interest Rate: {interestRate}% APR
                  </Typography>
                  <Slider
                    value={interestRate}
                    onChange={(_, value) => setInterestRate(value as number)}
                    min={currentConfig.minRate}
                    max={currentConfig.maxRate}
                    step={0.25}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    inputProps={{
                      min: currentConfig.minRate,
                      max: currentConfig.maxRate,
                      step: 0.25,
                    }}
                  />
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                  <Button
                    variant="contained"
                    onClick={addScenario}
                    disabled={!calculation}
                    sx={{ flex: 1, py: 1.5, fontWeight: 600 }}
                  >
                    Save Scenario
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setShowSchedule(!showSchedule)}
                    disabled={!calculation}
                    sx={{ flex: 1, py: 1.5, fontWeight: 600 }}
                  >
                    {showSchedule ? 'Hide' : 'Show'} Schedule
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Results Panel */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Calculation Results */}
              {calculation && (
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                      <AssessmentIcon sx={{ mr: 2, color: 'primary.main' }} />
                      Calculation Results
                    </Typography>
                    
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
                          <AttachMoneyIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {formatCurrency(calculation.monthlyPayment)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Monthly Payment
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'success.50', borderRadius: 2 }}>
                          <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                          <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                            {formatCurrency(calculation.totalInterest)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Interest
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'info.50', borderRadius: 2 }}>
                          <ScheduleIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                          <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                            {formatCurrency(calculation.totalPayment)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Payment
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Interest Rate
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {interestRate}% APR
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Loan Term
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {loanTerm} months
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Interest vs Principal
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {((calculation.totalInterest / calculation.totalPayment) * 100).toFixed(1)}% / {((loanAmount / calculation.totalPayment) * 100).toFixed(1)}%
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}

              {/* Payment Schedule */}
              {calculation && showSchedule && (
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                      Payment Schedule
                    </Typography>
                    
                    <TableContainer component={Paper} sx={{ maxHeight: 400, borderRadius: 2 }}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Month</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Payment</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Principal</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Interest</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Balance</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {calculation.paymentSchedule.slice(0, 12).map((payment) => (
                            <TableRow key={payment.month}>
                              <TableCell>{payment.month}</TableCell>
                              <TableCell>{formatCurrency(payment.payment)}</TableCell>
                              <TableCell>{formatCurrency(payment.principal)}</TableCell>
                              <TableCell>{formatCurrency(payment.interest)}</TableCell>
                              <TableCell>{formatCurrency(payment.balance)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    {calculation.paymentSchedule.length > 12 && (
                      <Alert severity="info" sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          Showing first 12 months. Total schedule contains {calculation.paymentSchedule.length} payments.
                        </Typography>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* LoanEase Pro Statistics & Trust Section */}
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  boxShadow: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    opacity: 0.3,
                  },
                }}
              >
                <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 700, 
                      textAlign: 'center',
                      fontFamily: 'Poppins',
                    }}
                  >
                    Ready to Apply? Join Thousands of Satisfied Customers
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 4, 
                      textAlign: 'center',
                      color: alpha(theme.palette.common.white, 0.9),
                      fontWeight: 400,
                    }}
                  >
                    LoanEase Pro has helped thousands of customers secure their financial goals
                  </Typography>

                  {/* Statistics Grid */}
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <AccountBalance sx={{ fontSize: 48, mb: 1, color: theme.palette.secondary.light }} />
                        <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'Poppins' }}>
                          $5.2B+
                        </Typography>
                        <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.8) }}>
                          Loans Processed
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Group sx={{ fontSize: 48, mb: 1, color: theme.palette.secondary.light }} />
                        <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'Poppins' }}>
                          150K+
                        </Typography>
                        <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.8) }}>
                          Happy Customers
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Star sx={{ fontSize: 48, mb: 1, color: '#FFD700' }} />
                        <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'Poppins' }}>
                          4.9/5
                        </Typography>
                        <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.8) }}>
                          Customer Rating
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Speed sx={{ fontSize: 48, mb: 1, color: theme.palette.secondary.light }} />
                        <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'Poppins' }}>
                          &lt; 2hrs
                        </Typography>
                        <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.8) }}>
                          Avg. Processing Time
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Trust Indicators */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, flexWrap: 'wrap', mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Verified sx={{ color: theme.palette.secondary.light, fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.9) }}>
                        SOC 2 Compliant
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: theme.palette.success.light, fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.9) }}>
                        99.9% Uptime
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Star sx={{ color: '#FFD700', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.9) }}>
                        Award Winning Platform
                      </Typography>
                    </Box>
                  </Box>

                  {/* Call to Action */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
                    <Link href="/apply">
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{
                          bgcolor: 'white',
                          color: theme.palette.primary.main,
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          borderRadius: 3,
                          boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`,
                          '&:hover': {
                            bgcolor: alpha(theme.palette.common.white, 0.95),
                            transform: 'translateY(-2px)',
                            boxShadow: `0 12px 40px ${alpha(theme.palette.common.black, 0.3)}`,
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        Apply Now
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          borderColor: alpha(theme.palette.common.white, 0.5),
                          color: 'white',
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderRadius: 3,
                          borderWidth: 2,
                          '&:hover': {
                            bgcolor: alpha(theme.palette.common.white, 0.1),
                            borderColor: 'white',
                            borderWidth: 2,
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Learn More
                      </Button>
                    </Link>
                  </Stack>
                </CardContent>
              </Card>

              {/* Scenario Comparison */}
              {scenarios.length > 0 && (
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                      Scenario Comparison
                    </Typography>
                    
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Scenario</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Term</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Rate</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Monthly Payment</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Total Interest</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {scenarios.map((scenario, index) => (
                            <TableRow key={index}>
                              <TableCell>{scenario.name}</TableCell>
                              <TableCell>{formatCurrency(scenario.amount)}</TableCell>
                              <TableCell>{scenario.term} months</TableCell>
                              <TableCell>{scenario.rate}%</TableCell>
                              <TableCell>{formatCurrency(scenario.monthlyPayment)}</TableCell>
                              <TableCell>{formatCurrency(scenario.totalInterest)}</TableCell>
                              <TableCell>
                                <Button
                                  size="small"
                                  color="error"
                                  onClick={() => removeScenario(index)}
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              )}

              {/* Tips and Information */}
              <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: 'grey.50' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    <InfoIcon sx={{ mr: 2, color: 'info.main' }} />
                    Helpful Tips
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                          Lower Interest Rates
                        </Typography>
                        <Typography variant="body2">
                          A good credit score can help you qualify for lower interest rates, saving thousands over the loan term.
                        </Typography>
                      </Alert>
                    </Grid>
                    
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Alert severity="success" sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                          Shorter Terms
                        </Typography>
                        <Typography variant="body2">
                          Shorter loan terms mean higher monthly payments but significantly less total interest paid.
                        </Typography>
                      </Alert>
                    </Grid>
                    
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Alert severity="warning">
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                          Budget Considerations
                        </Typography>
                        <Typography variant="body2">
                          Ensure your monthly payment doesn't exceed 28% of your gross monthly income.
                        </Typography>
                      </Alert>
                    </Grid>
                    
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Alert severity="error">
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                          Additional Costs
                        </Typography>
                        <Typography variant="body2">
                          Remember to factor in origination fees, insurance, and other associated costs.
                        </Typography>
                      </Alert>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default LoanCalculator;