import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AppliedStudent = () => {
    const { jobId } = useParams(); // Get jobId from URL parameters
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = Cookies.get('authToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await Axios.get(`http://localhost:4000/api/v1/application/allApplicatins/${jobId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('API Response:', response.data.applications); // Log the entire response data
                const applicationData = response.data.applications || [];
                
                // Log student info from the applications
                applicationData.forEach(application => {
                    console.log('Student Name:', application.studentInfo.name);
                    console.log('Student Email:', application.studentInfo.email);
                });

                setApplications(applicationData);
            } catch (error) {
                setError('Failed to fetch applications');
                console.error('Error fetching applications:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [jobId]);

    return (
        <Container>
            <IconButton
                onClick={() => navigate(-1)} // Navigate back to the previous page
                style={{ marginBottom: '20px' }}
            >
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom>
                Applied Students
            </Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>SL. No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Resume</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.map((application, index) => (
                                <TableRow key={application._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{application.studentInfo.name}</TableCell>
                                    <TableCell>{application.studentInfo.email}</TableCell>
                                    <TableCell>
                                        {application.studentInfo.resume ? (
                                            <Link href={application.studentInfo.resume.url} target="_blank" rel="noopener noreferrer">
                                                View Resume
                                            </Link>
                                        ) : (
                                            'No Resume Available'
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default AppliedStudent;
