// src/components/pages/Applications.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Sample applications data
const applicationsData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', resume: 'resume1.png' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', resume: 'resume2.png' },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', resume: 'resume3.png' },
  // Add more sample data as needed
];

const Applications = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { jobName, jobId } = location.state || {};

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Job Title: {jobName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Job ID: {jobId}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Resume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationsData.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.name}</TableCell>
                <TableCell>{application.email}</TableCell>
                <TableCell>
                  <img src={`path/to/resumes/${application.resume}`} alt="Resume" style={{ width: '50px', height: 'auto' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{ marginTop: '20px' }}
      >
        Back to Profile
      </Button>
    </div>
  );
};

export default Applications;
