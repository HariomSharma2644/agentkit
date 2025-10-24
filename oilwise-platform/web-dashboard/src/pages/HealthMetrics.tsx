import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';

export default function HealthMetrics() {
  const metrics = [
    { label: 'BMI', value: '24.5', status: 'Normal', color: '#2ecc71' },
    { label: 'Cholesterol', value: '180 mg/dL', status: 'Borderline', color: '#f39c12' },
    { label: 'Blood Pressure', value: '120/80', status: 'Normal', color: '#2ecc71' },
    { label: 'Blood Sugar', value: '95 mg/dL', status: 'Normal', color: '#2ecc71' },
  ];

  const healthImpact = [
    { condition: 'Obesity', risk: 'High', reduction: '15%' },
    { condition: 'Diabetes', risk: 'Medium', reduction: '8%' },
    { condition: 'Heart Disease', risk: 'Medium', reduction: '12%' },
    { condition: 'Hypertension', risk: 'Low', reduction: '5%' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 4, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          ❤️ Health Metrics & Impact
        </Typography>

        {/* Current Metrics */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
          Your Current Health Metrics
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {metrics.map((metric, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card sx={{ boxShadow: 1 }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {metric.label}
                  </Typography>
                  <Typography variant="h5" sx={{ color: metric.color, fontWeight: 'bold' }}>
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {metric.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Health Risk Assessment */}
        <Card sx={{ boxShadow: 2, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              🏥 Health Risk Assessment
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Based on your oil consumption and health metrics:
            </Typography>
            {healthImpact.map((item, idx) => (
              <Box key={idx} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {item.condition}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Risk: {item.risk}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={item.risk === 'High' ? 75 : item.risk === 'Medium' ? 50 : 25}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" sx={{ color: '#2ecc71', fontWeight: 'bold' }}>
                  Potential reduction with 10% oil cut: {item.reduction}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#e8f5e9' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  ✅ Positive Changes
                </Typography>
                <ul style={{ marginTop: 10 }}>
                  <li>Reduced risk of cardiovascular diseases</li>
                  <li>Better weight management</li>
                  <li>Improved cholesterol levels</li>
                  <li>Lower blood pressure</li>
                  <li>Better blood sugar control</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#fff3e0' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  📋 Personalized Recommendations
                </Typography>
                <ul style={{ marginTop: 10 }}>
                  <li>Reduce oil intake by 10% monthly</li>
                  <li>Increase physical activity to 30 min/day</li>
                  <li>Include more fiber-rich foods</li>
                  <li>Monitor cholesterol levels quarterly</li>
                  <li>Consult with a nutritionist</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Impact Projection */}
        <Card sx={{ boxShadow: 2, mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              📊 6-Month Impact Projection
            </Typography>
            <Alert severity="success" sx={{ mb: 2 }}>
              If you reduce oil intake by 10%, you could see significant health improvements in 6 months!
            </Alert>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Weight Loss:</strong> 2-3 kg
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Cholesterol Reduction:</strong> 15-20 mg/dL
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Blood Pressure:</strong> 5-10 mmHg reduction
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Energy Levels:</strong> 30% improvement
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

