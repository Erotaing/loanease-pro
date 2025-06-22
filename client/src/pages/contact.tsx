import React, { useState } from 'react'
import Layout from '../components/Layout'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Chip,
  useTheme,
  alpha,
  Card,
  CardContent,
  Stack
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Phone, Email, LocationOn, AccessTime, Support } from '@mui/icons-material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required')
})

const ContactPage: React.FC = () => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const theme = useTheme()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        setSuccess(true)
        setLoading(false)
        resetForm()
        
        setTimeout(() => setSuccess(false), 5000)
      }, 1000)
    }
  })

  return (
    <Layout title="Contact Us - LoanEase Pro">
      <Box sx={{ py: { xs: 6, md: 12 }, bgcolor: 'primary.50', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip
              label="Contact Us"
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
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 800,
                color: 'primary.900',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Get in Touch
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Have questions about our services? Our expert team is here to help you 
              find the perfect lending solution for your needs.
            </Typography>
          </Box>
          
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper 
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  boxShadow: theme.shadows[8]
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    color: 'primary.900',
                    mb: 4
                  }}
                >
                  Send us a Message
                </Typography>
                
                {success && (
                  <Alert 
                    severity="success" 
                    sx={{
                      mb: 4,
                      borderRadius: 2,
                      '& .MuiAlert-message': {
                        fontWeight: 500
                      }
                    }}
                  >
                    Thank you for your message! We'll get back to you within 24 hours.
                  </Alert>
                )}
                
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Full Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        name="subject"
                        label="Subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        error={formik.touched.subject && Boolean(formik.errors.subject)}
                        helperText={formik.touched.subject && formik.errors.subject}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      name="message"
                      label="Message"
                      multiline
                      rows={6}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      error={formik.touched.message && Boolean(formik.errors.message)}
                      helperText={formik.touched.message && formik.errors.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{
                        py: 2,
                        px: 4,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[8]
                        },
                        '&:disabled': {
                          background: alpha(theme.palette.primary.main, 0.3)
                        }
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              <Card 
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  boxShadow: theme.shadows[4],
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.900' }}>Phone</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>(555) 123-4567</Typography>
                <Chip 
                  icon={<AccessTime />} 
                  label="Mon-Fri 9AM-6PM EST" 
                  size="small" 
                  sx={{ 
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    color: 'success.main',
                    fontWeight: 500
                  }} 
                />
              </Card>
              
              <Card 
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  boxShadow: theme.shadows[4],
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.900' }}>Email</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>support@loaneasepro.com</Typography>
                <Chip 
                  icon={<Support />} 
                  label="24-hour response" 
                  size="small" 
                  sx={{ 
                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                    color: 'info.main',
                    fontWeight: 500
                  }} 
                />
              </Card>
              
              <Card 
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  boxShadow: theme.shadows[4],
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.900' }}>Office</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.6 }}>
                  1234 Loan Street<br />
                  Suite 100<br />
                  Financial District, NY 10004
                </Typography>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      </Box>
    </Layout>
  )
}

export default ContactPage