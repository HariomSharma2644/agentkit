import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { icon: '📊', title: 'Consumption Tracking', desc: 'Monitor your daily oil intake with AI-powered insights' },
    { icon: '🍳', title: 'Smart Recipes', desc: 'Discover low-oil recipes tailored to your preferences' },
    { icon: '❤️', title: 'Health Metrics', desc: 'Track health impact and receive personalized recommendations' },
    { icon: '🎁', title: 'Reward System', desc: 'Earn points for healthy choices and redeem rewards' },
    { icon: '📚', title: 'Education Hub', desc: 'Learn about balanced diets and healthy cooking' },
    { icon: '✅', title: 'Certifications', desc: 'Verify certified low-oil restaurants and products' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#2ecc71', color: 'white', py: 8, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            🌾 OilWise Platform
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4, opacity: 0.95 }}>
            Reduce Oil Consumption, Improve Health, Support India's Self-Reliance
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ backgroundColor: 'white', color: '#2ecc71', fontWeight: 'bold' }}
              onClick={() => navigate('/consumption-tracker')}
            >
              Start Tracking
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ borderColor: 'white', color: 'white' }}
              onClick={() => navigate('/recipes')}
            >
              Explore Recipes
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} sx={{ textAlign: 'center' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h4" sx={{ color: '#2ecc71', fontWeight: 'bold' }}>19.3 kg</Typography>
              <Typography variant="body2">Per capita annual consumption</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h4" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>60%</Typography>
              <Typography variant="body2">Higher than recommended</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h4" sx={{ color: '#3498db', fontWeight: 'bold' }}>56%</Typography>
              <Typography variant="body2">Oil imported annually</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h4" sx={{ color: '#f39c12', fontWeight: 'bold' }}>10%</Typography>
              <Typography variant="body2">Target reduction goal</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
            Platform Features
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{ height: '100%', boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ mb: 1 }}>{feature.icon}</Typography>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ backgroundColor: '#ecf0f1', py: 6, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Alert severity="info" sx={{ mb: 3 }}>
            Join thousands of Indians in reducing oil consumption and improving health!
          </Alert>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/consumption-tracker')}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

