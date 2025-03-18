import React, { useState } from 'react';
import Counseling from './Counseling';
import Resources from './Resources';
import Mentorship from './Mentorship';
import { Button, Box, Typography } from '@mui/material';

const Category = () => {
  const [selectedPage, setSelectedPage] = useState(null);

  const renderContent = () => {
    switch (selectedPage) {
      case 'counseling':
        return <Counseling />;
      case 'mentorship':
        return <Mentorship />;
      case 'resources':
        return <Resources />;
      default:
        return (
          <Typography variant="h6" color="textSecondary">
            Please select a category to view the content.
          </Typography>
        );
    }
  };

  return (
    <Box textAlign="center" padding="2rem">
      <Typography variant="h4" gutterBottom>
        Category Selection
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom="2rem">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setSelectedPage('counseling')}
          style={{ margin: '0 1rem' }}
        >
          Counseling
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setSelectedPage('mentorship')}
          style={{ margin: '0 1rem' }}
        >
          Mentorship
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => setSelectedPage('resources')}
          style={{ margin: '0 1rem' }}
        >
          Resources
        </Button>
      </Box>
      <Box>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Category;
