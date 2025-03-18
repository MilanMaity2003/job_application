import React from 'react';
import { Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { FaRegCalendarAlt, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const Counseling = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f4f4f4' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Counseling Services
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Our comprehensive counseling services are coming soon! Stay tuned for professional career advice, personalized guidance, and much more.
      </Typography>

      <Grid container spacing={4} justifyContent="center" style={{ marginTop: '2rem' }}>
        {/* Placeholder for Upcoming Features */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ backgroundColor: '#fff', textAlign: 'center', padding: '2rem' }}>
            <FaRegCalendarAlt size={50} style={{ color: '#3f51b5', marginBottom: '1rem' }} />
            <CardContent>
              <Typography variant="h6" component="div">
                Career Counseling
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Get professional advice on your career path and goals.
              </Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ backgroundColor: '#fff', textAlign: 'center', padding: '2rem' }}>
            <FaChalkboardTeacher size={50} style={{ color: '#3f51b5', marginBottom: '1rem' }} />
            <CardContent>
              <Typography variant="h6" component="div">
                Resume Building
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Access tools and templates to create a winning resume.
              </Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ backgroundColor: '#fff', textAlign: 'center', padding: '2rem' }}>
            <FaUserGraduate size={50} style={{ color: '#3f51b5', marginBottom: '1rem' }} />
            <CardContent>
              <Typography variant="h6" component="div">
                Interview Preparation
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Prepare for interviews with expert tips and mock sessions.
              </Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          What to Expect in the Future
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Our counseling services will include personalized career guidance, one-on-one sessions with professional counselors, resume and cover letter assistance, interview preparation, and more. We are dedicated to providing you with the resources and support you need to succeed in your career journey.
        </Typography>
        <Button variant="contained" color="secondary" style={{ marginTop: '1rem' }}>
          Stay Updated
        </Button>
      </div>
    </div>
  );
};

export default Counseling;
