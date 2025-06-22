import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  AccountBalance as AccountBalanceIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const quickLinks = [
    { text: 'Loan Applications', href: '/applications' },
    { text: 'Borrower Portal', href: '/borrowers' },
    { text: 'Dashboard', href: '/dashboard' },
    { text: 'About Us', href: '/about' },
    { text: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
    { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
    { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.900',
        color: 'white',
        py: 8,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <AccountBalanceIcon sx={{ fontSize: 32, color: 'primary.200' }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  fontFamily: 'Poppins', 
                  fontWeight: 700,
                  color: 'primary.100',
                }}
              >
                LoanEase Pro
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'primary.200', 
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              Streamlining your loan origination process with advanced technology, 
              exceptional service, and professional expertise you can trust.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  sx={{
                    color: 'primary.200',
                    bgcolor: 'primary.800',
                    '&:hover': {
                      bgcolor: 'primary.700',
                      color: 'white',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Poppins',
                fontWeight: 600, 
                mb: 3,
                color: 'white',
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  sx={{
                    color: 'primary.200',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      color: 'white',
                      textDecoration: 'underline',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Poppins',
                fontWeight: 600, 
                mb: 3,
                color: 'white',
              }}
            >
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocationOnIcon sx={{ color: 'primary.300', fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'primary.200' }}>
                    1234 Financial Plaza, Suite 100
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'primary.200' }}>
                    New York, NY 10004
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon sx={{ color: 'primary.300', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'primary.200' }}>
                  (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailIcon sx={{ color: 'primary.300', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'primary.200' }}>
                  support@loaneasepro.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Business Hours */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Poppins',
                fontWeight: 600, 
                mb: 3,
                color: 'white',
              }}
            >
              Business Hours
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'primary.200' }}>
                  Monday - Friday
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  9:00 AM - 6:00 PM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'primary.200' }}>
                  Saturday
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  10:00 AM - 4:00 PM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'primary.200' }}>
                  Sunday
                </Typography>
                <Typography variant="body2" sx={{ color: 'primary.300' }}>
                  Closed
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'primary.700' }} />

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'primary.300',
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            © {currentYear || new Date().getFullYear()} LoanEase Pro. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link 
              href="/privacy" 
              sx={{ 
                color: 'primary.200', 
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'white' },
              }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              sx={{ 
                color: 'primary.200', 
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'white' },
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
