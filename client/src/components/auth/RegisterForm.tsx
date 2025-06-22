import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { 
  Container,
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Box,
  Link as MuiLink,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  alpha
} from '@mui/material'
import { PersonAddOutlined } from '@mui/icons-material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import api from '../../lib/api'
import Link from 'next/link'

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be minimum 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  role: yup.string().required('Role is required')
})

const RegisterForm: React.FC = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const theme = useTheme()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'borrower'
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      setError('')
      
      try {
        const { confirmPassword, ...registerData } = values
        const response = await api.post('/auth/register', registerData)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        router.push('/dashboard')
      } catch (err: any) {
        setError(err.response?.data?.message || 'Registration failed')
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, ${theme.palette.secondary.main} 100%)`,
        py: 4,
        px: 2
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: theme.shadows[24],
            overflow: 'hidden',
            bgcolor: alpha(theme.palette.common.white, 0.95),
            backdropFilter: 'blur(20px)'
          }}
        >
          <CardContent sx={{ p: 6 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: `0 8px 32px ${alpha(theme.palette.secondary.main, 0.3)}`
                }}
              >
                <PersonAddOutlined sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 1
                }}
              >
                Create Your Account
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '1.1rem'
                }}
              >
                Join LoanEase Pro and streamline your lending process
              </Typography>
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-message': {
                    fontSize: '0.95rem'
                  }
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2
                        }
                      }
                    }}
                  />
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2
                        }
                      }
                    }}
                  />
                </Grid>
                
                <Grid size={12}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2
                        }
                      }
                    }}
                  />
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2
                        }
                      }
                    }}
                  />
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2
                        }
                      }
                    }}
                  />
                </Grid>
                
                <Grid size={12}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2
                        }
                      }
                    }}
                  >
                    <InputLabel id="role-label">Account Type</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      label="Account Type"
                    >
                      <MenuItem value="borrower">Individual Borrower</MenuItem>
                      <MenuItem value="loan_officer">Loan Officer</MenuItem>
                      {/* <MenuItem value="admin">Administrator</MenuItem> */}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                  boxShadow: `0 4px 16px ${alpha(theme.palette.secondary.main, 0.3)}`,
                  mt: 4,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.4)}`
                  },
                  '&:disabled': {
                    background: theme.palette.grey[300],
                    color: theme.palette.grey[500]
                  }
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary
                }}
              >
                Already have an account?{' '}
                <Link href="/login" passHref>
                  <MuiLink
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Sign in here
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default RegisterForm