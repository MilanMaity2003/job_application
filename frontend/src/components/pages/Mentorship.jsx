import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';

const Mentorship = () => {
  const handleComingSoonClick = () => {
    alert('Coming Soon!');
  };

  return (
    <Box padding="2rem">
      <Typography variant="h4" gutterBottom>
        Mentorship Program
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            What We Offer
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Our Mentorship Program pairs students and job seekers with experienced industry professionals.
            This program is designed to provide guidance, advice, and support to help you navigate your
            career path successfully.
          </Typography>
        </CardContent>
      </Card>
      <Card style={{ marginTop: '1rem' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upcoming Features
          </Typography>
          <Typography variant="body1" color="textSecondary">
            - Personalized mentorship matching based on your field of interest.
            <br />
            - Regular one-on-one sessions with mentors.
            <br />
            - Access to exclusive webinars and industry insights.
            <br />
            - Networking opportunities with professionals in your chosen industry.
          </Typography>
        </CardContent>
      </Card>
      <Box marginTop="2rem" textAlign="center">
        <Button variant="contained" color="primary" onClick={handleComingSoonClick}>
          Coming Soon
        </Button>
      </Box>
    </Box>
  );
};

export default Mentorship;
