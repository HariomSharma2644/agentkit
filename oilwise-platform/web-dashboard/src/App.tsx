import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import ConsumptionTracker from './pages/ConsumptionTracker';
import RecipeSuggestions from './pages/RecipeSuggestions';
import HealthMetrics from './pages/HealthMetrics';
import RewardSystem from './pages/RewardSystem';
import PolicyDashboard from './pages/PolicyDashboard';
import CertificationHub from './pages/CertificationHub';
import EducationHub from './pages/EducationHub';

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
    success: {
      main: '#27ae60',
    },
    warning: {
      main: '#f39c12',
    },
    error: {
      main: '#e74c3c',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navigation drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/consumption-tracker" element={<ConsumptionTracker />} />
              <Route path="/recipes" element={<RecipeSuggestions />} />
              <Route path="/health-metrics" element={<HealthMetrics />} />
              <Route path="/rewards" element={<RewardSystem />} />
              <Route path="/policy-dashboard" element={<PolicyDashboard />} />
              <Route path="/certifications" element={<CertificationHub />} />
              <Route path="/education" element={<EducationHub />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

