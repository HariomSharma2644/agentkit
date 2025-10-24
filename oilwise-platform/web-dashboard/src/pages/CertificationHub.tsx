import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function CertificationHub() {
  const certifiedRestaurants = [
    { name: 'Green Leaf Cafe', cuisine: 'Indian', avgOil: '2.5g/meal', rating: 4.8, verified: true },
    { name: 'Healthy Bites', cuisine: 'Multi-cuisine', avgOil: '1.8g/meal', rating: 4.6, verified: true },
    { name: 'Spice Garden', cuisine: 'Indian', avgOil: '3.2g/meal', rating: 4.5, verified: true },
    { name: 'Wellness Kitchen', cuisine: 'Fusion', avgOil: '1.5g/meal', rating: 4.9, verified: true },
    { name: 'Farm to Table', cuisine: 'Organic', avgOil: '1.2g/meal', rating: 4.7, verified: true },
    { name: 'Quick Healthy', cuisine: 'Fast Food', avgOil: '2.0g/meal', rating: 4.4, verified: true },
  ];

  const certifiedProducts = [
    { name: 'Low-Oil Chips', brand: 'HealthySnack Co', oilContent: '8%', price: '₹40' },
    { name: 'Baked Samosas', brand: 'Fresh Foods', oilContent: '5%', price: '₹60' },
    { name: 'Whole Wheat Bread', brand: 'Grain Mill', oilContent: '2%', price: '₹30' },
    { name: 'Vegetable Snacks', brand: 'Nature\'s Best', oilContent: '6%', price: '₹50' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 4, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          ✅ Certification Hub & Blockchain Verification
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          🔗 All certifications are verified using blockchain technology for transparency and authenticity
        </Alert>

        {/* Certification Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#e8f5e9' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  Certified Restaurants
                </Typography>
                <Typography variant="h4" sx={{ color: '#2ecc71', fontWeight: 'bold' }}>
                  1,250+
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#e3f2fd' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  Certified Products
                </Typography>
                <Typography variant="h4" sx={{ color: '#3498db', fontWeight: 'bold' }}>
                  850+
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#f3e5f5' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  Blockchain Verified
                </Typography>
                <Typography variant="h4" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                  100%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#fff3e0' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  Transactions
                </Typography>
                <Typography variant="h4" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                  50K+
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Certified Restaurants */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
          🍽️ Certified Low-Oil Restaurants
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {certifiedRestaurants.map((restaurant, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {restaurant.name}
                    </Typography>
                    {restaurant.verified && (
                      <Chip 
                        label="✓ Verified"
                        size="small"
                        sx={{ backgroundColor: '#2ecc71', color: 'white' }}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip label={restaurant.cuisine} size="small" variant="outlined" />
                    <Chip label={`⭐ ${restaurant.rating}`} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2, color: '#2ecc71', fontWeight: 'bold' }}>
                    Avg Oil: {restaurant.avgOil}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    size="small"
                  >
                    View Menu
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Certified Products */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
          📦 Certified Low-Oil Products
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {certifiedProducts.map((product, idx) => (
            <Grid item xs={12} sm={6} md={6} key={idx}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.brand}
                      </Typography>
                    </Box>
                    <Chip 
                      label={`${product.oilContent} oil`}
                      sx={{ backgroundColor: '#2ecc71', color: 'white' }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Price: <strong>{product.price}</strong>
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    size="small"
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Blockchain Info */}
        <Card sx={{ boxShadow: 2, backgroundColor: '#f0f7ff' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              🔗 Blockchain Verification System
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              All certifications are recorded on blockchain for complete transparency:
            </Typography>
            <ul style={{ marginTop: 10 }}>
              <li><strong>Immutable Records:</strong> All certification data is permanently recorded</li>
              <li><strong>Real-time Verification:</strong> Scan QR codes to verify authenticity</li>
              <li><strong>Transparent Supply Chain:</strong> Track products from source to consumer</li>
              <li><strong>Smart Contracts:</strong> Automated compliance verification</li>
              <li><strong>Consumer Trust:</strong> Cryptographic proof of certification</li>
            </ul>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

