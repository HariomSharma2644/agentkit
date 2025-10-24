import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';

export default function EducationHub() {
  const courses = [
    {
      title: 'Healthy Cooking Basics',
      level: 'Beginner',
      duration: '4 weeks',
      lessons: 12,
      progress: 75,
      desc: 'Learn fundamental techniques for low-oil cooking'
    },
    {
      title: 'Nutrition & Balanced Diet',
      level: 'Intermediate',
      duration: '6 weeks',
      lessons: 18,
      progress: 45,
      desc: 'Understand nutrition science and meal planning'
    },
    {
      title: 'Regional Cuisines Low-Oil',
      level: 'Intermediate',
      duration: '5 weeks',
      lessons: 15,
      progress: 30,
      desc: 'Explore low-oil versions of regional Indian cuisines'
    },
    {
      title: 'Advanced Nutrition',
      level: 'Advanced',
      duration: '8 weeks',
      lessons: 24,
      progress: 0,
      desc: 'Deep dive into nutritional science and health'
    },
  ];

  const resources = [
    { icon: '📹', title: 'Video Tutorials', count: '150+', desc: 'Step-by-step cooking videos' },
    { icon: '📚', title: 'E-Books', count: '25+', desc: 'Comprehensive guides and recipes' },
    { icon: '🎓', title: 'Webinars', count: '40+', desc: 'Live sessions with experts' },
    { icon: '📊', title: 'Infographics', count: '100+', desc: 'Visual health information' },
    { icon: '🎯', title: 'Quizzes', count: '50+', desc: 'Test your knowledge' },
    { icon: '💬', title: 'Community Forum', count: '10K+', desc: 'Connect with others' },
  ];

  const schoolPrograms = [
    { name: 'Mid-Day Meal Enhancement', schools: '5,000+', students: '2.5M+', status: 'Active' },
    { name: 'School Nutrition Clubs', schools: '3,500+', students: '1.8M+', status: 'Active' },
    { name: 'Teacher Training', schools: '2,000+', teachers: '15K+', status: 'Active' },
    { name: 'Student Ambassadors', schools: '4,000+', ambassadors: '50K+', status: 'Active' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 4, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          📚 Education Hub & Learning Resources
        </Typography>

        {/* Learning Paths */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
          🎓 Structured Learning Paths
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {courses.map((course, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card sx={{ boxShadow: 2, height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {course.title}
                    </Typography>
                    <Chip 
                      label={course.level}
                      size="small"
                      sx={{
                        backgroundColor: course.level === 'Beginner' ? '#2ecc71' : course.level === 'Intermediate' ? '#f39c12' : '#e74c3c',
                        color: 'white'
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {course.desc}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                    <Chip label={`⏱️ ${course.duration}`} size="small" variant="outlined" />
                    <Chip label={`📖 ${course.lessons} lessons`} size="small" variant="outlined" />
                  </Box>
                  {course.progress > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption">Progress</Typography>
                        <Typography variant="caption">{course.progress}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={course.progress} />
                    </Box>
                  )}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    size="small"
                  >
                    {course.progress > 0 ? 'Continue' : 'Start Course'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Resources */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
          📖 Learning Resources
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {resources.map((resource, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ boxShadow: 1, textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {resource.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {resource.title}
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#2ecc71', fontWeight: 'bold', mb: 1 }}>
                    {resource.count}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {resource.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* School Programs */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
          🏫 School & Community Programs
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {schoolPrograms.map((program, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {program.name}
                    </Typography>
                    <Chip 
                      label={program.status}
                      size="small"
                      sx={{ backgroundColor: '#2ecc71', color: 'white' }}
                    />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        {program.schools ? 'Schools' : 'Teachers'}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3498db' }}>
                        {program.schools || program.teachers}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        {program.students ? 'Students' : 'Ambassadors'}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2ecc71' }}>
                        {program.students || program.ambassadors}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Expert Guidance */}
        <Card sx={{ boxShadow: 2, backgroundColor: '#e8f5e9' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              👨‍⚕️ Expert Guidance & Support
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Learn from certified nutritionists, health experts, and professional chefs:
            </Typography>
            <ul style={{ marginTop: 10 }}>
              <li><strong>Nutritionists:</strong> Get personalized diet plans and health advice</li>
              <li><strong>Chefs:</strong> Learn professional cooking techniques</li>
              <li><strong>Health Experts:</strong> Understand disease prevention and wellness</li>
              <li><strong>Farmers:</strong> Learn about oilseed cultivation and benefits</li>
              <li><strong>Policy Makers:</strong> Understand national health initiatives</li>
            </ul>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

