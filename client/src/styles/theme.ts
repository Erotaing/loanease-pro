import { createTheme, ThemeOptions } from '@mui/material/styles';

// Custom color palette
const palette = {
  primary: {
    50: '#f0f4ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#1e40af',
    600: '#1d4ed8',
    700: '#1e3a8a',
    800: '#1e293b',
    900: '#0f172a',
    main: '#1e40af',
    dark: '#1e3a8a',
    light: '#3b82f6',
    contrastText: '#ffffff',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    main: '#64748b',
    dark: '#475569',
    light: '#94a3b8',
    contrastText: '#ffffff',
  },
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    main: '#10b981',
    dark: '#059669',
    light: '#34d399',
    contrastText: '#ffffff',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    main: '#f59e0b',
    dark: '#d97706',
    light: '#fbbf24',
    contrastText: '#ffffff',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    main: '#ef4444',
    dark: '#dc2626',
    light: '#f87171',
    contrastText: '#ffffff',
  },
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    main: '#3b82f6',
    dark: '#2563eb',
    light: '#60a5fa',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  background: {
    default: '#fafafa',
    paper: '#ffffff',
  },
  text: {
    primary: '#262626',
    secondary: '#525252',
    disabled: '#a3a3a3',
  },
  divider: '#e5e5e5',
};

// Typography configuration
const typography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '3rem',
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: '-0.025em',
    color: '#0f172a',
  },
  h2: {
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '2.25rem',
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: '-0.025em',
    color: '#0f172a',
  },
  h3: {
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '1.875rem',
    fontWeight: 600,
    lineHeight: 1.25,
    color: '#0f172a',
  },
  h4: {
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.375,
    color: '#0f172a',
  },
  h5: {
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.375,
    color: '#0f172a',
  },
  h6: {
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.375,
    color: '#0f172a',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.625,
    color: '#404040',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: '#525252',
  },
  subtitle1: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: '#262626',
  },
  subtitle2: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: '#404040',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none' as const,
    letterSpacing: '0.025em',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
    color: '#737373',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: '#737373',
  },
};

// Shadow configuration
const shadows = [
  'none',
  '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  '0 35px 60px -12px rgb(0 0 0 / 0.3)',
  '0 0 20px rgb(59 130 246 / 0.3)',
  '0 0 40px rgb(59 130 246 / 0.4)',
  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  '0 35px 60px -12px rgb(0 0 0 / 0.3)',
  '0 0 20px rgb(59 130 246 / 0.3)',
  '0 0 40px rgb(59 130 246 / 0.4)',
  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  '0 35px 60px -12px rgb(0 0 0 / 0.3)',
  '0 0 20px rgb(59 130 246 / 0.3)',
  '0 0 40px rgb(59 130 246 / 0.4)',
  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '0 25px 50px -12px rgb(0 0 0 / 0.25)',
] as any;

// Component overrides
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '0.5rem',
        textTransform: 'none' as const,
        fontWeight: 500,
        fontSize: '0.875rem',
        padding: '0.75rem 1.5rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        transition: 'all 250ms ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-1px)',
        },
        '&:focus': {
          outline: '2px solid #1e40af',
          outlineOffset: '2px',
        },
        '&:disabled': {
          opacity: 0.5,
          cursor: 'not-allowed',
          pointerEvents: 'none',
        },
      },
      contained: {
        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        '&:hover': {
          background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        },
      },
      outlined: {
        borderWidth: '1px',
        borderColor: '#1e40af',
        color: '#1e40af',
        '&:hover': {
          borderWidth: '1px',
          backgroundColor: '#f0f4ff',
          borderColor: '#1d4ed8',
        },
      },
      text: {
        color: '#525252',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e5e5',
        backgroundColor: '#ffffff',
        transition: 'all 250ms ease-in-out',
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
          borderColor: '#c7d2fe',
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '0.5rem',
          backgroundColor: '#ffffff',
          transition: 'all 150ms ease-in-out',
          '& fieldset': {
            borderColor: '#d4d4d4',
          },
          '&:hover fieldset': {
            borderColor: '#a3a3a3',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1e40af',
            borderWidth: '2px',
          },
          '&.Mui-focused': {
            backgroundColor: '#f0f4ff',
          },
          '&.Mui-error fieldset': {
            borderColor: '#ef4444',
          },
          '&.Mui-error.Mui-focused': {
            backgroundColor: '#fef2f2',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#525252',
          fontSize: '0.875rem',
          fontWeight: 500,
          '&.Mui-focused': {
            color: '#1e40af',
          },
          '&.Mui-error': {
            color: '#ef4444',
          },
        },
        '& .MuiFormHelperText-root': {
          fontSize: '0.875rem',
          marginTop: '0.25rem',
          '&.Mui-error': {
            color: '#dc2626',
          },
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '0.75rem',
        fontWeight: 500,
        fontSize: '0.75rem',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        height: 'auto',
        padding: '0.25rem 0.75rem',
      },
      colorPrimary: {
        backgroundColor: '#e0e7ff',
        color: '#1e3a8a',
      },
      colorSecondary: {
        backgroundColor: '#f5f5f5',
        color: '#404040',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        backgroundColor: '#ffffff',
      },
      elevation1: {
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      elevation2: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
      elevation3: {
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        color: '#1e293b',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: '0.5rem',
        margin: '0.25rem 0.5rem',
        transition: 'all 150ms ease-in-out',
        '&:hover': {
          backgroundColor: '#f0f4ff',
          color: '#1e40af',
        },
        '&.Mui-selected': {
          backgroundColor: '#e0e7ff',
          color: '#1e3a8a',
          '&:hover': {
            backgroundColor: '#c7d2fe',
          },
        },
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none' as const,
        fontWeight: 500,
        fontSize: '0.875rem',
        color: '#525252',
        '&.Mui-selected': {
          color: '#1e40af',
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: '#1e40af',
        height: '3px',
        borderRadius: '1.5px',
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
      },
      standardSuccess: {
        backgroundColor: '#ecfdf5',
        color: '#047857',
        border: '1px solid #a7f3d0',
      },
      standardError: {
        backgroundColor: '#fef2f2',
        color: '#b91c1c',
        border: '1px solid #fecaca',
      },
      standardWarning: {
        backgroundColor: '#fffbeb',
        color: '#b45309',
        border: '1px solid #fde68a',
      },
      standardInfo: {
        backgroundColor: '#eff6ff',
        color: '#1d4ed8',
        border: '1px solid #bfdbfe',
      },
    },
  },
};

// Shape configuration
const shape = {
  borderRadius: 8,
};

// Spacing configuration
const spacing = 8;

// Breakpoints configuration
const breakpoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

// Create the theme
const themeOptions: ThemeOptions = {
  palette,
  typography,
  shadows,
  components,
  shape,
  spacing,
  breakpoints,
};

export const theme = createTheme(themeOptions);

export default theme;