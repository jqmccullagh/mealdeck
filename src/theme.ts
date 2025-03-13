import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a0072',      // Deep purple
      light: '#7c39a4',     // Lighter purple for hover states
      dark: '#2c004d',      // Darker purple for active states
      contrastText: '#fff', // White text for contrast
    },
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h1: {
      fontFamily: 'Big Shoulders Display',
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontFamily: 'Big Shoulders Display',
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontFamily: 'Big Shoulders Display',
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontFamily: 'Big Shoulders Display',
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontFamily: 'Big Shoulders Display',
      fontWeight: 500,
      fontSize: '1.375rem',
    },
    h6: {
      fontFamily: 'Big Shoulders Display',
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    subtitle1: {
      fontFamily: 'Big Shoulders Display',
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    subtitle2: {
      fontFamily: 'Big Shoulders Display',
      fontWeight: 500,
      fontSize: '1.125rem',
    },
    body1: {
      fontFamily: 'Raleway, sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    body2: {
      fontFamily: 'Big Shoulders Display',
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    button: {
      fontFamily: 'Big Shoulders Display',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          '& .MuiTypography-h6': {
            fontSize: '1.25rem',
            fontWeight: 600,
            fontFamily: 'Big Shoulders Display'
          },
          '& .MuiTypography-body1': {
            fontSize: '1.25rem',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 500
          },
          '& .MuiTypography-body2': {
            fontSize: '1.125rem',
            fontFamily: 'Big Shoulders Display',
            fontWeight: 600
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontSize: '1.125rem',
          '&:hover': {
            backgroundColor: '#7c39a4',  // Light purple for hover
            borderColor: '#7c39a4',
          },
        },
        outlined: {
          '&:hover': {
            borderColor: '#7c39a4',
            backgroundColor: 'rgba(74, 0, 114, 0.04)',  // Very light purple background
          }
        },
        contained: {
          '&:hover': {
            backgroundColor: '#7c39a4',
          }
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthXl: {
          maxWidth: '1400px !important',
          '@media (min-width: 1400px)': {
            maxWidth: '1400px !important',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: '0.02em',  // Slightly increased letter spacing for better readability
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1400,
    },
  },
});

export default theme; 