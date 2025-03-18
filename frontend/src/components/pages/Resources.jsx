import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';

const Resources = () => {
  const handleComingSoonClick = () => {
    alert('Coming Soon!');
  };

  return (
    <Box padding="2rem">
      <Typography variant="h4" gutterBottom textAlign="center">
        Resources
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom textAlign="center">
        Explore the resources we offer to help you in your job search and career development.
      </Typography>

      <Grid container spacing={3} marginTop="2rem">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resume Building
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Utilize our tools to create a professional resume that stands out to employers. 
                We provide templates, tips, and examples to help you craft a resume that highlights your skills and experience.
              </Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={handleComingSoonClick}>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Interview Preparation
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Prepare for your interviews with our comprehensive guides and practice questions.
                Learn how to answer common questions, present yourself confidently, and make a great impression.
              </Typography>
              <Button variant="contained" color="secondary" style={{ marginTop: '1rem' }} onClick={handleComingSoonClick}>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Job Search Strategies
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Discover effective job search strategies tailored to your industry. 
                From networking to online job boards, we provide tips on how to find and apply for the right jobs.
              </Typography>
              <Button variant="contained" color="success" style={{ marginTop: '1rem' }} onClick={handleComingSoonClick}>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Career Advice
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Get advice from industry experts on how to advance your career. 
                Whether you're just starting out or looking to make a change, we have resources to guide you.
              </Typography>
              <Button variant="contained" color="warning" style={{ marginTop: '1rem' }} onClick={handleComingSoonClick}>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Online Courses
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Enhance your skills with our curated list of online courses. 
                Whether you want to learn a new language, coding, or project management, we have the resources to get you started.
              </Typography>
              <Button variant="contained" color="info" style={{ marginTop: '1rem' }} onClick={handleComingSoonClick}>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Networking Tips
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Learn how to expand your professional network both online and in person. 
                Get tips on attending events, using LinkedIn, and building relationships that can lead to job opportunities.
              </Typography>
              <Button variant="contained" color="error" style={{ marginTop: '1rem' }} onClick={handleComingSoonClick}>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Resources;
