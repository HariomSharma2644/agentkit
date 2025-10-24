import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ConsumptionPage from './pages/consumption/ConsumptionPage';
import HealthPage from './pages/health/HealthPage';
import RecipesPage from './pages/recipes/RecipesPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import PartnersPage from './pages/partners/PartnersPage';
import CertificationsPage from './pages/certifications/CertificationsPage';
import UsersPage from './pages/users/UsersPage';

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route element={<MainLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/consumption" element={<ConsumptionPage />} />
              <Route path="/health" element={<HealthPage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/certifications" element={<CertificationsPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

