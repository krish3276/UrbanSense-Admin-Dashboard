import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a365d', // Deep navy blue - government style
      light: '#2c5282',
      dark: '#0f2442',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2f855a', // Forest green
      light: '#48bb78',
      dark: '#22543d',
      contrastText: '#ffffff',
    },
    error: {
      main: '#c53030',
      light: '#fc8181',
      dark: '#9b2c2c',
    },
    warning: {
      main: '#dd6b20',
      light: '#f6ad55',
      dark: '#c05621',
    },
    info: {
      main: '#2b6cb0',
      light: '#63b3ed',
      dark: '#2c5282',
    },
    success: {
      main: '#2f855a',
      light: '#68d391',
      dark: '#22543d',
    },
    background: {
      default: '#f7fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.08)',
    '0px 2px 6px rgba(0, 0, 0, 0.1)',
    '0px 4px 12px rgba(0, 0, 0, 0.1)',
    '0px 6px 16px rgba(0, 0, 0, 0.12)',
    '0px 8px 24px rgba(0, 0, 0, 0.12)',
    '0px 12px 32px rgba(0, 0, 0, 0.14)',
    '0px 16px 40px rgba(0, 0, 0, 0.14)',
    '0px 20px 48px rgba(0, 0, 0, 0.16)',
    '0px 24px 56px rgba(0, 0, 0, 0.16)',
    '0px 28px 64px rgba(0, 0, 0, 0.18)',
    ...Array(14).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        containedPrimary: {
          boxShadow: '0px 2px 6px rgba(26, 54, 93, 0.3)',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(26, 54, 93, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f7fafc',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: '#1a365d',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e2e8f0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #e2e8f0',
        },
      },
    },
  },
});

export default theme;
