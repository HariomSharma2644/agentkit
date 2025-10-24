import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2ecc71',
    },
    secondary: {
      main: '#3498db',
    },
    background: {
      default: '#ecf0f1',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom sx={{ color: '#2ecc71' }}>
            🌾 OilWise Platform
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#555', marginBottom: 3 }}>
            Digital Solution for Reducing Edible Oil Consumption in India
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3, maxWidth: 600 }}>
            Welcome to OilWise Platform. This is a digital solution designed to help reduce edible oil consumption
            through real-time price alerts, profitability simulations, crop economics dashboards, weather advisories,
            market linkages, government scheme access, FPO linkages, and gamification features.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
            <Button variant="outlined" color="primary" size="large">
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

