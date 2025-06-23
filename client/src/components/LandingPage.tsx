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
            background: 'url("/api/placeholder/1920/1080") center/cover',
            opacity: 0.1,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  lineHeight: 1.1,
                  mb: 3,
                  background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Transform Your Lending Business
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Streamline loan processing with AI-powered automation, advanced analytics, and enterprise-grade security.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    '&:hover': {
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  Start Free Trial
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: alpha('#ffffff', 0.1),
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Schedule Demo
                </Button>
              </Stack>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Chip
                  icon={<CheckCircle />}
                  label="No Setup Fees"
                  sx={{
                    bgcolor: alpha('#ffffff', 0.2),
                    color: 'white',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: 'white' },
                  }}
                />
                <Chip
                  icon={<Verified />}
                  label="Bank-Grade Security"
                  sx={{
                    bgcolor: alpha('#ffffff', 0.2),
                    color: 'white',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: 'white' },
                  }}
                />
                <Chip
                  icon={<Support />}
                  label="24/7 Support"
                  sx={{
                    bgcolor: alpha('#ffffff', 0.2),
                    color: 'white',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: 'white' },
                  }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: -20,
                    bottom: -20,
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    borderRadius: 4,
                    zIndex: 0,
                  },
                }}
              >
                <Paper
                  elevation={24}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <Typography variant="h6" gutterBottom color="primary.main" fontWeight={700}>
                    Quick Stats
                  </Typography>
                  <Grid container spacing={3}>
                    {stats.map((stat, index) => (
                      <Grid size={{ xs: 6 }} key={index}>
                        <Stat {...stat} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 700,
                mb: 2,
                color: 'primary.900',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Why Choose LoanEase Pro?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Discover the features that make us the leading choice for modern lending institutions
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Feature {...feature} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 700,
                mb: 2,
                color: 'primary.900',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              What Our Clients Say
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Join thousands of satisfied customers who have transformed their lending operations
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
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}
          >
            Join thousands of lending professionals who trust LoanEase Pro to streamline their operations
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={Link}
              href="/register"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Start Your Free Trial
              <ArrowForward sx={{ ml: 1 }} />
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                borderWidth: 2,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: alpha('#ffffff', 0.1),
                },
              }}
            >
              Contact Sales
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;