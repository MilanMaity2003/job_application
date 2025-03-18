import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Typography } from '@mui/material';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/job/getJob');
        // Assuming the response contains an array of jobs
        console.log('Fetched Jobs:', response.data.jobs); // Logging the jobs array
        setJobs(response.data.jobs.slice(0, 9)); // Limit to 9 jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleShowAllJobs = () => {
    navigate('/jobs'); // Navigate to the jobs section
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-4">Revolutionize Your Job Search with AI</h1>
        <p className="text-lg mb-8">
          Our AI-driven platform connects you with the perfect job opportunities tailored to your skills and interests. 
          Let technology take your career to the next level.
        </p>
        <div className="mt-6">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out">
            Get Started
          </button>
          <button className="ml-4 bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out">
            Learn More
          </button>
        </div>
        <div className="mt-10 flex justify-center items-center space-x-4">
          <img src="https://www.shutterstock.com/image-vector/generative-ai-artificial-intelligence-concept-600nw-2365806311.jpg" alt="AI Illustration" className="w-48 h-auto" />
          <img src="https://www.shutterstock.com/image-photo/handsome-young-man-wearing-blue-260nw-1601122837.jpg" alt="Job Search Illustration" className="w-48 h-auto" />
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className='p-8'>
        <Typography variant='h4' className='mb-6 font-bold'>
          Featured Jobs
        </Typography>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {jobs.map((job, index) => (
            <Card key={index} className='p-4 shadow-lg'>
              <Typography variant='h6' className='font-semibold'>
                {job.jobTitle}
              </Typography>
              <Typography variant='body1' className='text-gray-600'>
                {job.companyName}
              </Typography>
              <Typography variant='body2' className='text-gray-500'>
                Location: {job.location}
              </Typography>
            </Card>
          ))}
        </div>
        <div className='mt-8 text-center'>
          <Button
            variant='contained'
            color='primary'
            onClick={handleShowAllJobs}
            className='bg-blue-500 text-white hover:bg-blue-700'
          >
            Show All Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
