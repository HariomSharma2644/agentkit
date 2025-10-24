import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

export default function RecipeSuggestions() {
  const recipes = [
    {
      name: 'Steamed Momos',
      cuisine: 'Tibetan',
      oilContent: '2g',
      servings: 4,
      time: '30 min',
      ingredients: ['Flour', 'Vegetables', 'Minimal oil'],
      benefits: 'High protein, low fat',
    },
    {
      name: 'Baked Samosas',
      cuisine: 'Indian',
      oilContent: '3g',
      servings: 6,
      time: '45 min',
      ingredients: ['Potatoes', 'Peas', 'Spices'],
      benefits: 'Crispy without deep frying',
    },
    {
      name: 'Grilled Tandoori Chicken',
      cuisine: 'Indian',
      oilContent: '1g',
      servings: 4,
      time: '40 min',
      ingredients: ['Chicken', 'Yogurt', 'Spices'],
      benefits: 'High protein, minimal oil',
    },
    {
      name: 'Vegetable Stir-fry',
      cuisine: 'Asian',
      oilContent: '2g',
      servings: 3,
      time: '20 min',
      ingredients: ['Mixed vegetables', 'Soy sauce', 'Garlic'],
      benefits: 'Quick and healthy',
    },
    {
      name: 'Baked Falafel',
      cuisine: 'Middle Eastern',
      oilContent: '1g',
      servings: 4,
      time: '35 min',
      ingredients: ['Chickpeas', 'Herbs', 'Spices'],
      benefits: 'Plant-based protein',
    },
    {
      name: 'Steamed Idli',
      cuisine: 'South Indian',
      oilContent: '0.5g',
      servings: 4,
      time: '25 min',
      ingredients: ['Rice', 'Urad dal', 'Salt'],
      benefits: 'Traditional, oil-free',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 4, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          🍳 Low-Oil Recipe Suggestions
        </Typography>

        <Box sx={{ mb: 4, p: 3, backgroundColor: 'white', borderRadius: 1, boxShadow: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            AI-Powered Recipe Recommendations
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Discover delicious recipes from various cuisines with minimal oil content. Each recipe is optimized for health and taste.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {recipes.map((recipe, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ height: '100%', boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {recipe.name}
                    </Typography>
                    <Chip 
                      label={recipe.oilContent} 
                      size="small"
                      sx={{ backgroundColor: '#2ecc71', color: 'white' }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip label={recipe.cuisine} size="small" variant="outlined" />
                    <Chip label={recipe.time} size="small" variant="outlined" />
                    <Chip label={`${recipe.servings} servings`} size="small" variant="outlined" />
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 2, color: '#2ecc71', fontWeight: 'bold' }}>
                    ✓ {recipe.benefits}
                  </Typography>

                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    size="small"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Personalization Section */}
        <Box sx={{ mt: 6, p: 3, backgroundColor: 'white', borderRadius: 1, boxShadow: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            🎯 Personalized Recommendations
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Our AI learns your preferences and suggests recipes based on:
          </Typography>
          <ul>
            <li>Your dietary preferences and restrictions</li>
            <li>Regional cuisine preferences</li>
            <li>Cooking time availability</li>
            <li>Nutritional goals</li>
            <li>Previous recipe ratings</li>
          </ul>
        </Box>
      </Container>
    </Box>
  );
}

