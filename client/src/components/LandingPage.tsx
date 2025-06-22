import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip,
  Paper,
  useTheme,
  alpha,
  Stack,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  Security,
  Speed,
  Support,
  CheckCircle,
  Star,
  AccountBalance,
  Assessment,
  Group,
  Timeline,
  ArrowForward,
  Verified,
  AutoGraph,
  Shield,
  FlashOn,
  SupportAgent,
} from '@mui/icons-material';
import Link from 'next/link';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, color }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{
        height: '100%',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 4,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            color: 'white',
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          {icon}
        </Box>
        <Typography 
          variant="h5" 
          component="h3" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: 700, 
            color: 'primary.900',
            mb: 2,
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            flexGrow: 1,
            color: 'text.secondary',
            lineHeight: 1.6,
            fontSize: '1rem',
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Testimonial: React.FC<TestimonialProps> = ({ name, role, content, rating, avatar }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{
        height: '100%',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: 4,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar 
            src={avatar || undefined} 
            sx={{ 
              width: 56, 
              height: 56, 
              mr: 2,
              border: `3px solid ${theme.palette.primary.main}`,
              bgcolor: theme.palette.primary.main,
              color: 'white',
            }} 
          >
            {!avatar && name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Poppins',
                fontWeight: 600,
                color: 'primary.900',
              }}
            >
              {name}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {role}
            </Typography>
          </Box>
        </Box>
        <Rating 
          value={rating} 
          readOnly 
          sx={{ 
            mb: 2,
            '& .MuiRating-iconFilled': {
              color: '#FFD700',
            },
          }} 
        />
        <Typography 
          variant="body1" 
          sx={{ 
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: 'text.primary',
          }}
        >
          "{content}"
        </Typography>
      </CardContent>
    </Card>
  );
};

const Stat: React.FC<StatProps> = ({ value, label, icon }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        textAlign: 'center',
        p: 3,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <Box 
        sx={{ 
          color: theme.palette.primary.main, 
          mb: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <Typography 
        variant="h3" 
        sx={{ 
          fontFamily: 'Poppins',
          fontWeight: 800, 
          color: 'primary.900',
          mb: 1,
        }}
      >
        {value}
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'text.secondary',
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

const LandingPage: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <FlashOn sx={{ fontSize: 48 }} />,
      title: 'Lightning Fast Processing',
      description: 'Process loan applications in minutes with our AI-powered automation. Reduce processing time by up to 90% compared to traditional methods.',
      color: 'primary',
    },
    {
      icon: <Shield sx={{ fontSize: 48 }} />,
      title: 'Enterprise Security',
      description: 'Bank-grade security with 256-bit encryption, multi-factor authentication, and compliance with industry standards.',
      color: 'success',
    },
    {
      icon: <AutoGraph sx={{ fontSize: 48 }} />,
      title: 'Advanced Analytics',
      description: 'Real-time insights and predictive analytics to optimize your loan portfolio and reduce risk exposure.',
      color: 'secondary',
    },
    {
      icon: <SupportAgent sx={{ fontSize: 48 }} />,
      title: 'Expert Support',
      description: 'Dedicated support team available 24/7 with industry expertise and personalized assistance.',
      color: 'info',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Financial Officer',
      content: 'LoanEase Pro transformed our lending operations. We\'ve reduced processing time by 85% and improved customer satisfaction significantly.',
      rating: 5,
      avatar: '',
    },
    {
      name: 'Michael Chen',
      role: 'VP of Operations',
      content: 'The analytics and reporting features are outstanding. We now have real-time insights that help us make better lending decisions.',
      rating: 5,
      avatar: '',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Loan Officer',
      content: 'The user interface is intuitive and the automation features have streamlined our entire workflow. Highly recommended!',
      rating: 5,
      avatar: '',
    },
  ];

  const stats = [
    { value: '$5.2B+', label: 'Loans Processed', icon: <AccountBalance fontSize="large" /> },
    { value: '150K+', label: 'Happy Customers', icon: <Group fontSize="large" /> },
    { value: '4.9/5', label: 'Customer Rating', icon: <Star fontSize="large" /> },
    { value: '< 2hrs', label: 'Avg. Processing Time', icon: <Speed fontSize="large" /> },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: { xs: 10, md: 16 },
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
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Chip
                  label="#1 Loan Origination Platform"
                  sx={{
                    bgcolor: alpha(theme.palette.secondary.light, 0.2),
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    border: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
                  }}
                />
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' },
                    lineHeight: 1.1,
                    mb: 3,
                  }}
                >
                  Transform Your
                  <br />
                  <Box component="span" sx={{ color: theme.palette.secondary.light }}>
                    Lending Business
                  </Box>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: { xs: '1.1rem', md: '1.4rem' },
                    lineHeight: 1.6,
                    mb: 4,
                    color: alpha(theme.palette.common.white, 0.9),
                    maxWidth: '600px',
                  }}
                >
                  Revolutionize your loan origination process with AI-powered automation, 
                  real-time analytics, and enterprise-grade security. Process applications 
                  90% faster while reducing operational costs.
                </Typography>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 6 }}>
                  <Link href="/apply" passHref>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForward />}
                      sx={{
                        bgcolor: 'white',
                        color: theme.palette.primary.main,
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: 3,
                        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`,
                        '&:hover': {
                          bgcolor: alpha(theme.palette.common.white, 0.95),
                          transform: 'translateY(-3px)',
                          boxShadow: `0 12px 40px ${alpha(theme.palette.common.black, 0.3)}`,
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link href="/dashboard" passHref>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: alpha(theme.palette.common.white, 0.5),
                        color: 'white',
                        px: 4,
                        py: 2,
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
                      Watch Demo
                    </Button>
                  </Link>
                </Stack>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Verified sx={{ color: theme.palette.secondary.light, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.8) }}>
                      SOC 2 Compliant
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star sx={{ color: '#FFD700', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.8) }}>
                      4.9/5 Customer Rating
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ color: theme.palette.success.light, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.8) }}>
                      99.9% Uptime
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: 400, md: 500, lg: 600 },
                }}
              >
                {/* Background decorative elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle at center, ${alpha(theme.palette.secondary.light, 0.2)} 0%, transparent 70%)`,
                    borderRadius: '50%',
                    animation: 'pulse 4s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { transform: 'scale(1)', opacity: 0.7 },
                      '50%': { transform: 'scale(1.1)', opacity: 0.4 },
                    },
                  }}
                />
                
                {/* Main icon */}
                <AccountBalance
                  sx={{
                    fontSize: { xs: 180, md: 240, lg: 300 },
                    color: alpha(theme.palette.common.white, 0.15),
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))',
                  }}
                />
                
                {/* Floating elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    bgcolor: alpha(theme.palette.success.main, 0.9),
                    borderRadius: 2,
                    p: 2,
                    animation: 'float 6s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-20px)' },
                    },
                  }}
                >
                  <CheckCircle sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '15%',
                    bgcolor: alpha(theme.palette.secondary.main, 0.9),
                    borderRadius: 2,
                    p: 2,
                    animation: 'float 6s ease-in-out infinite 2s',
                  }}
                >
                  <TrendingUp sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                
                <Box
                  sx={{
                    position: 'absolute',
                    top: '60%',
                    right: '25%',
                    bgcolor: alpha(theme.palette.info.main, 0.9),
                    borderRadius: 2,
                    p: 2,
                    animation: 'float 6s ease-in-out infinite 4s',
                  }}
                >
                  <Speed sx={{ color: 'white', fontSize: 24 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'primary.50' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Stat {...stat} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Chip
              label="Features"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                fontWeight: 600,
                mb: 3,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            />
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontFamily: 'Poppins',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                mb: 3,
                color: 'primary.900',
              }}
            >
              Why Choose LoanEase Pro?
            </Typography>
            <Typography
              variant="h5"
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                fontWeight: 400,
                color: 'text.secondary',
                lineHeight: 1.6,
              }}
            >
              Experience the future of lending with our innovative platform designed 
              to accelerate your business growth and enhance customer satisfaction.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
                <Feature {...feature} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: 'primary.50' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Chip
              label="Testimonials"
              sx={{
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: 'secondary.main',
                fontWeight: 600,
                mb: 3,
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
              }}
            />
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontFamily: 'Poppins',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                mb: 3,
                color: 'primary.900',
              }}
            >
              What Our Customers Say
            </Typography>
            <Typography
              variant="h5"
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                fontWeight: 400,
                color: 'text.secondary',
                lineHeight: 1.6,
              }}
            >
              Join thousands of satisfied customers who have transformed their 
              lending operations with LoanEase Pro.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Testimonial {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 10, md: 16 },
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontFamily: 'Poppins',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                mb: 3,
              }}
            >
              Ready to Transform Your
              <br />
              <Box component="span" sx={{ color: theme.palette.secondary.light }}>
                Lending Process?
              </Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 6,
                opacity: 0.9,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Join thousands of financial institutions already using LoanEase Pro 
              to streamline their operations and delight their customers.
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              sx={{ justifyContent: 'center' }}
            >
              <Link href="/apply" passHref>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    px: 6,
                    py: 2.5,
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.common.white, 0.95),
                      transform: 'translateY(-3px)',
                      boxShadow: `0 12px 40px ${alpha(theme.palette.common.black, 0.3)}`,
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Start Your Free Trial
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: alpha(theme.palette.common.white, 0.5),
                    color: 'white',
                    px: 6,
                    py: 2.5,
                    fontSize: '1.2rem',
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
                  Contact Sales
                </Button>
              </Link>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;