import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Typography, TextField, Button, Card, CardContent, Grid, Box, IconButton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpdateJob = () => {
    const { jobId } = useParams(); // Get job ID from route parameters
    const [jobDetails, setJobDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const token = Cookies.get('authToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await Axios.get(`http://localhost:4000/api/v1/job/getJob/${jobId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setJobDetails(response.data.job);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job details:', error.response?.data || error.message);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                console.error('No token found');
                return;
            }

            await Axios.put(`http://localhost:4000/api/v1/job/updateJob/${jobId}`, jobDetails, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Job updated successfully!');
            navigate('/profile'); // Redirect to profile after updating
        } catch (error) {
            console.error('Error updating job:', error.response?.data || error.message);
            toast.error('Failed to update job.');
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container
            className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
        >
            <Card
                className="w-full max-w-4xl bg-white shadow-lg p-6 rounded-lg border-4 border-transparent"
                style={{
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #f3ec78, #af4261, #007cf0, #00dfd8) border-box',
                }}
            >
                <CardContent>
                    <Box display="flex" alignItems="center">
                        <IconButton
                            color="primary"
                            onClick={() => navigate('/profile')}
                            edge="start"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            align="center"
                            className="text-gray-800 font-bold mb-6 flex-grow text-center"
                        >
                            Update Job
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Job Title"
                                    name="jobTitle"
                                    value={jobDetails.jobTitle || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="bg-gray-200 rounded-md"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Location"
                                    name="location"
                                    value={jobDetails.location || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="bg-gray-200 rounded-md"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Company Name"
                                    name="companyName"
                                    value={jobDetails.companyName || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="bg-gray-200 rounded-md"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Job Niche"
                                    name="jobNiche"
                                    value={jobDetails.jobNiche || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="bg-gray-200 rounded-md"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Job Description"
                                    name="jobDescription"
                                    value={jobDetails.jobDescription || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    required
                                    className="bg-gray-200 rounded-md"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Qualifications"
                                    name="qualifications"
                                    value={jobDetails.qualifications || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="bg-gray-200 rounded-md"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Salary"
                                    name="salary"
                                    value={jobDetails.salary || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="bg-gray-200 rounded-md"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Required Skills"
                                    name="requiredSkills"
                                    value={jobDetails.requiredSkills || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="bg-gray-200 rounded-md"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Responsibilities"
                                    name="responsibilities"
                                    value={jobDetails.responsibilities || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    required
                                    className="bg-gray-200 rounded-md"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700"
                                    >
                                        Update Job
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

            {/* Toast Container */}
            <ToastContainer />
        </Container>
    );
};

export default UpdateJob;
