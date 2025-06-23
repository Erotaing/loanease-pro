import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  Dashboard as DashboardIcon,
  AccountBalance as AccountBalanceIcon,
  Close as CloseIcon,
  Login as LoginIcon,
  Calculate as CalculateIcon,
} from '@mui/icons-material';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Calculator', path: '/calculator', icon: <CalculateIcon /> },
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Applications', path: '/applications', icon: <DescriptionIcon /> },
    { text: 'Borrowers', path: '/borrowers', icon: <PersonIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActivePath = (path: string) => {
    return router.pathname === path || (path !== '/' && router.pathname.startsWith(path));
  };

  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountBalanceIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: 'primary.main' }}>
              LoanEase Pro
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton 
              component={Link}
              href={item.path}
              onClick={handleDrawerToggle}
              selected={isActivePath(item.path)}
              sx={{
                borderRadius: 2,
                textDecoration: 'none',
                width: '100%',
                '&.Mui-selected': {
                  bgcolor: 'primary.50',
                  color: 'primary.700',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.700',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        
        {/* Login/Signup Button for Mobile */}
        <ListItem disablePadding sx={{ mt: 2 }}>
          <ListItemButton 
            component={Link}
            href="/login"
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'white',
              textDecoration: 'none',
              width: '100%',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '& .MuiListItemIcon-root': {
                color: 'white',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}><LoginIcon /></ListItemIcon>
            <ListItemText 
              primary="Login / Sign Up" 
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, sm: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
              <AccountBalanceIcon sx={{ color: 'primary.main', fontSize: 32 }} />
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontFamily: 'Poppins', 
                  fontWeight: 700, 
                  color: 'primary.main',
                  letterSpacing: '-0.025em',
                }}
              >
                LoanEase Pro
              </Typography>
            </Box>

            {isMobile ? (
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  bgcolor: 'primary.50',
                  '&:hover': {
                    bgcolor: 'primary.100',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    href={item.path}
                    startIcon={item.icon}
                    variant={isActivePath(item.path) ? 'contained' : 'text'}
                    sx={{
                      px: 3,
                      py: 1,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      textTransform: 'none',
                      textDecoration: 'none',
                      borderRadius: 2,
                      ...(isActivePath(item.path) ? {
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                      } : {
                        color: 'text.secondary',
                        '&:hover': {
                          bgcolor: 'primary.50',
                          color: 'primary.main',
                        },
                      }),
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                
                {/* Login/Signup Button */}
                <Button
                  component={Link}
                  href="/login"
                  startIcon={<LoginIcon />}
                  variant="outlined"
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    textDecoration: 'none',
                    borderRadius: 2,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    ml: 1,
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  Login / Sign Up
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
