// ApplyButton.jsx
import React from 'react';
import { Button } from '@mui/material';

function ApplyButton({ onClick }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Apply Now
    </Button>
  );
}

export default ApplyButton;
