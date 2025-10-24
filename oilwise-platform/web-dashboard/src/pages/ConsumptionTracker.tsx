import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function ConsumptionTracker() {
  const [dailyIntake, setDailyIntake] = useState(0);
  const [mealType, setMealType] = useState('breakfast');
  const [oilAmount, setOilAmount] = useState('');
  const [entries, setEntries] = useState<any[]>([]);

  const recommendedDaily = 33; // 12kg/year ÷ 365 days ≈ 33g/day
  const currentIntake = dailyIntake;
  const progressPercent = Math.min((currentIntake / recommendedDaily) * 100, 100);

  const handleAddEntry = () => {
    if (oilAmount && !isNaN(Number(oilAmount))) {
      const newEntry = {
        id: Date.now(),
        meal: mealType,
        amount: Number(oilAmount),
        time: new Date().toLocaleTimeString(),
      };
      setEntries([...entries, newEntry]);
      setDailyIntake(dailyIntake + Number(oilAmount));
      setOilAmount('');
    }
  };

  const healthRisk = currentIntake > recommendedDaily ? 'High' : currentIntake > recommendedDaily * 0.8 ? 'Medium' : 'Low';
  const riskColor = healthRisk === 'High' ? '#e74c3c' : healthRisk === 'Medium' ? '#f39c12' : '#2ecc71';

  return (
    <Box sx={{ minHeight: '100vh', py: 4, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          📊 Oil Consumption Tracker
        </Typography>

        <Grid container spacing={3}>
          {/* Input Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Log Your Oil Intake
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Meal Type</InputLabel>
                    <Select
                      value={mealType}
                      label="Meal Type"
                      onChange={(e) => setMealType(e.target.value)}
                    >
                      <MenuItem value="breakfast">Breakfast</MenuItem>
                      <MenuItem value="lunch">Lunch</MenuItem>
                      <MenuItem value="dinner">Dinner</MenuItem>
                      <MenuItem value="snack">Snack</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Oil Amount (grams)"
                    type="number"
                    value={oilAmount}
                    onChange={(e) => setOilAmount(e.target.value)}
                    fullWidth
                  />
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleAddEntry}
                  >
                    Add Entry
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Stats Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 2, mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Today's Summary
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Total Intake: {currentIntake}g</Typography>
                    <Typography>Recommended: {recommendedDaily}g</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={progressPercent}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" sx={{ mt: 1, color: riskColor, fontWeight: 'bold' }}>
                    Health Risk: {healthRisk}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {currentIntake > recommendedDaily && (
              <Alert severity="warning">
                ⚠️ You've exceeded the recommended daily intake! Consider reducing oil in your next meal.
              </Alert>
            )}
          </Grid>

          {/* Entries List */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Today's Entries ({entries.length})
                </Typography>
                {entries.length === 0 ? (
                  <Typography color="textSecondary">No entries yet. Start logging your meals!</Typography>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                    {entries.map((entry) => (
                      <Box 
                        key={entry.id}
                        sx={{ 
                          p: 2, 
                          backgroundColor: '#f0f0f0', 
                          borderRadius: 1,
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography>
                          {entry.meal.charAt(0).toUpperCase() + entry.meal.slice(1)}: {entry.amount}g
                        </Typography>
                        <Typography variant="body2" color="textSecondary">{entry.time}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Tips Section */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#e8f5e9' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  💡 Tips to Reduce Oil Intake
                </Typography>
                <ul style={{ marginTop: 10 }}>
                  <li>Use air fryers or baking instead of deep frying</li>
                  <li>Opt for steaming or boiling vegetables</li>
                  <li>Use cooking spray instead of pouring oil</li>
                  <li>Choose grilled or roasted options at restaurants</li>
                  <li>Increase intake of naturally low-oil foods</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

