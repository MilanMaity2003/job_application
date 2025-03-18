import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [isRecruiter, setIsRecruiter] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = Cookies.get('authToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }
        
                // Fetch user details
                const userResponse = await Axios.get(
                    'http://localhost:4000/api/v1/getUser',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`, 
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setUserDetails(userResponse.data.user || {});
                setIsRecruiter(userResponse.data.user.role === "Recruiter");
                setIsStudent(userResponse.data.user.role === "Student");
        
                if (userResponse.data.user.role === "Recruiter") {
                    const jobsResponse = await Axios.get(
                        'http://localhost:4000/api/v1/job/getRecruiterJob',
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    setJobs(jobsResponse.data.postedJob || []);
                }
            } catch (error) {
                console.error('Error fetching user details or jobs:', error.response?.data || error.message);
            }
        };
        

        fetchUserDetails();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Job Listings
            </Typography>

            {/* Conditional Rendering of Create Job Button */}
            {isRecruiter && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/createJob')}
                    sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                        },
                    }}
                >
                    Create Job
                </Button>
            )}

            <Grid container spacing={3} mt={2}>
                {jobs.length === 0 ? (
                    <Typography variant="h6" color="text.secondary">
                        No jobs available.
                    </Typography>
                ) : (
                    jobs.map((job, index) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, #ECE9E6 0%, #FFFFFF 100%)',
                                boxShadow: 3,
                                borderRadius: '12px',
                            }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {job.jobTitle}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {job.location} - {job.companyName}
                                    </Typography>
                                    {/* Conditional Rendering of Apply Button */}
                                    {isStudent && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => navigate(`/apply/${job._id}`)}
                                            sx={{
                                                background: 'linear-gradient(45deg, #FF6F61 30%, #FF3D00 90%)',
                                                color: 'white',
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #FF3D00 30%, #FF6F61 90%)',
                                                },
                                            }}
                                        >
                                            Apply Now
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default Jobs;
