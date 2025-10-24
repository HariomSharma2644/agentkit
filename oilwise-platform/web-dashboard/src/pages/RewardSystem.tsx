import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';

export default function RewardSystem() {
  const userPoints = 2450;
  const pointsToNextLevel = 550;
  const currentLevel = 'Silver';

  const rewards = [
    { name: 'Healthy Meal Voucher', points: 500, discount: '₹200 off' },
    { name: 'Fitness App Subscription', points: 1000, discount: '3 months free' },
    { name: 'Nutrition Consultation', points: 750, discount: 'Free session' },
    { name: 'Cooking Class', points: 600, discount: '50% off' },
    { name: 'Health Checkup', points: 1200, discount: 'Free screening' },
    { name: 'Restaurant Voucher', points: 400, discount: '₹150 off low-oil meals' },
  ];

  const achievements = [
    { icon: '🏃', name: '7-Day Tracker', desc: 'Logged oil intake for 7 consecutive days' },
    { icon: '🥗', name: 'Recipe Master', desc: 'Tried 10 different low-oil recipes' },
    { icon: '📈', name: 'Health Improver', desc: 'Reduced oil intake by 20%' },
    { icon: '🎯', name: 'Goal Achiever', desc: 'Met daily oil intake target 30 times' },
    { icon: '👥', name: 'Community Helper', desc: 'Shared 5 recipes with friends' },
    { icon: '⭐', name: 'Wellness Champion', desc: 'Maintained healthy habits for 90 days' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 4, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          🎁 Reward System & Achievements
        </Typography>

        {/* Points Summary */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#fff3e0' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  Total Points
                </Typography>
                <Typography variant="h4" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                  {userPoints}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#e3f2fd' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  Current Level
                </Typography>
                <Typography variant="h4" sx={{ color: '#3498db', fontWeight: 'bold' }}>
                  {currentLevel}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#f3e5f5' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  To Next Level
                </Typography>
                <Typography variant="h4" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                  {pointsToNextLevel}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#e8f5e9' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  Achievements
                </Typography>
                <Typography variant="h4" sx={{ color: '#2ecc71', fontWeight: 'bold' }}>
                  4/6
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Progress to Next Level */}
        <Card sx={{ boxShadow: 2, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Progress to Gold Level
            </Typography>
            <Box sx={{ mt: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={(userPoints / (userPoints + pointsToNextLevel)) * 100}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {userPoints} / {userPoints + pointsToNextLevel} points
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
          🏆 Your Achievements
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {achievements.map((achievement, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ boxShadow: 1 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {achievement.icon}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {achievement.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {achievement.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Available Rewards */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
          💳 Available Rewards
        </Typography>
        <Grid container spacing={3}>
          {rewards.map((reward, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {reward.name}
                    </Typography>
                    <Chip 
                      label={`${reward.points}pts`}
                      sx={{ backgroundColor: '#2ecc71', color: 'white' }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2, color: '#f39c12', fontWeight: 'bold' }}>
                    {reward.discount}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    fullWidth
                    disabled={userPoints < reward.points}
                  >
                    {userPoints >= reward.points ? 'Redeem' : 'Not Enough Points'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

