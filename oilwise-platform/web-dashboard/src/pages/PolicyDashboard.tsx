import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';

export default function PolicyDashboard() {
  const states = [
    { name: 'Maharashtra', reduction: 8.5, target: 10, population: '1.2M' },
    { name: 'Karnataka', reduction: 7.2, target: 10, population: '0.8M' },
    { name: 'Tamil Nadu', reduction: 9.1, target: 10, population: '0.9M' },
    { name: 'Delhi', reduction: 6.3, target: 10, population: '0.5M' },
    { name: 'Gujarat', reduction: 5.8, target: 10, population: '0.7M' },
    { name: 'Telangana', reduction: 7.9, target: 10, population: '0.6M' },
  ];

  const policies = [
    { name: 'Differentiated GST', status: 'Active', impact: 'High', desc: 'Lower GST on certified low-oil products' },
    { name: 'School Nutrition Program', status: 'Active', impact: 'High', desc: 'Low-oil meals in Mid-Day Meal scheme' },
    { name: 'Restaurant Certification', status: 'Active', impact: 'Medium', desc: 'Digital labels showing oil content' },
    { name: 'Farmer Support', status: 'Planned', impact: 'High', desc: 'Incentives for oilseed cultivation' },
    { name: 'Community Awareness', status: 'Active', impact: 'Medium', desc: 'Campaigns in 500+ villages' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 4, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          📊 Policy Dashboard & Analytics
        </Typography>

        {/* National Overview */}
        <Card sx={{ boxShadow: 2, mb: 4, backgroundColor: '#e8f5e9' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              🇮🇳 National Campaign Progress
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">
                  Participants
                </Typography>
                <Typography variant="h5" sx={{ color: '#2ecc71', fontWeight: 'bold' }}>
                  2.5M+
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">
                  Avg Reduction
                </Typography>
                <Typography variant="h5" sx={{ color: '#2ecc71', fontWeight: 'bold' }}>
                  7.5%
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">
                  Target
                </Typography>
                <Typography variant="h5" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                  10%
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">
                  States Covered
                </Typography>
                <Typography variant="h5" sx={{ color: '#3498db', fontWeight: 'bold' }}>
                  28/28
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* State-wise Progress */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
          📍 State-wise Progress
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {states.map((state, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card sx={{ boxShadow: 1 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {state.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {state.population} participants
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(state.reduction / state.target) * 100}
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption">
                      {state.reduction}% achieved
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Target: {state.target}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Active Policies */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
          📋 Active Policies & Initiatives
        </Typography>
        <Grid container spacing={3}>
          {policies.map((policy, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {policy.name}
                    </Typography>
                    <Chip 
                      label={policy.status}
                      size="small"
                      sx={{
                        backgroundColor: policy.status === 'Active' ? '#2ecc71' : '#f39c12',
                        color: 'white'
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {policy.desc}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      label={`Impact: ${policy.impact}`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Impact Metrics */}
        <Card sx={{ boxShadow: 2, mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              📈 Projected Impact (Annual)
            </Typography>
            <Alert severity="success" sx={{ mb: 3 }}>
              If 10% reduction is achieved nationally, India could save ₹2.78 trillion in healthcare costs!
            </Alert>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Oil Imports Reduction:</strong> 2.78M tonnes
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Foreign Exchange Saved:</strong> ₹22,000 Cr
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Healthcare Cost Reduction:</strong> ₹2.78 Trillion
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Farmer Income Increase:</strong> ₹5,000 Cr
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

