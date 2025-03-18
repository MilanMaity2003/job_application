import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import {
    Container, Typography, Avatar, Button, Grid, Card, CardContent, CardActions,
    IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    DialogContentText, CircularProgress
} from '@mui/material';
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StudentProfile from './StudentProfile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [userDetails, setUserDetails] = useState({});
    const [jobs, setJobs] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteJobId, setDeleteJobId] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = Cookies.get('authToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

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
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };

        fetchUserDetails();
    }, []);

    const handleEditClick = () => {
        setUpdatedDetails({
            ...userDetails,
            email: userDetails.email
        });
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDetails({
            ...updatedDetails,
            [name]: value
        });
    };

    const handleUpdate = async () => {
        setLoading(true); // Start loading spinner
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                console.error('No token found');
                return;
            }

            const { email, ...dataToUpdate } = updatedDetails;

            await Axios.put(
                'http://localhost:4000/api/v1/update/profile',
                dataToUpdate,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setUserDetails({
                ...updatedDetails,
                email: userDetails.email
            });
            setEditDialogOpen(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error("User already exists");
            } else {
                console.error('Error updating profile:', error.response?.data || error.message);
                toast.error('Failed to update profile.');
            }
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    const handleDeleteDialogOpen = (jobId) => {
        setDeleteJobId(jobId);
        setOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteJobId(null);
        setOpen(false);
    };

    const handleConfirmDelete = async () => {
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                console.error('No token found');
                return;
            }

            await Axios.delete(`http://localhost:4000/api/v1/job/deleteJob/${deleteJobId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setJobs(jobs.filter(job => job._id !== deleteJobId));
            toast.success('Job deleted successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Error deleting job:', error.response?.data || error.message);
            toast.error('Failed to delete job.');
        } finally {
            handleDeleteDialogClose();
        }
    };

    if (userDetails.role === "Student") {
        return <StudentProfile />;
    }

    return (
        <Container>
            <Grid container spacing={3}>
                {/* Left Side: User Details */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                        boxShadow: 5,
                        padding: 3,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #ECE9E6 0%, #FFFFFF 100%)',
                    }}>
                        <Grid container direction="column" spacing={2} alignItems="center">
                            <Grid item>
                                {loading ? (
                                    <Skeleton variant="circular" width={120} height={120} />
                                ) : (
                                    <Avatar
                                        src={userDetails.image}
                                        alt={userDetails.name}
                                        sx={{ width: 120, height: 120 }}
                                    />
                                )}
                            </Grid>
                            <Grid item>
                                {loading ? (
                                    <>
                                        <Skeleton variant="text" width={180} height={30} />
                                        <Skeleton variant="text" width={150} height={25} />
                                        <Skeleton variant="text" width={150} height={25} />
                                        <Skeleton variant="text" width={100} height={25} />
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h5">
                                            Name: {userDetails.name || 'N/A'}
                                        </Typography>
                                        <Typography variant="h6">
                                            Email: {userDetails.email || 'N/A'}
                                        </Typography>
                                        <Typography variant="h6">
                                            Phone: {userDetails.phoneNo || 'N/A'}
                                        </Typography>
                                        <Typography variant="h6">
                                            Role: {userDetails.role || 'N/A'}
                                        </Typography>
                                    </>
                                )}
                            </Grid>
                            <Grid item>
                                {!loading && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleEditClick}
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
                                        Edit Profile
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                {/* Right Side: Jobs and Create Job Button */}
                <Grid item xs={12} md={8}>
                    {!loading && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/createjob')}
                            sx={{
                                position: 'relative',
                                top: 0,
                                right: 0,
                                marginBottom: 3,
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

                    <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: 2 }}>
                        CREATED JOBS:
                    </Typography>
                    <Grid container spacing={3}>
                        {loading ? (
                            [1, 2, 3].map((index) => (
                                <Grid item xs={12} md={6} lg={4} key={index}>
                                    <Skeleton variant="rectangular" width="100%" height={200} />
                                </Grid>
                            ))
                        ) : (
                            jobs.map((job) => (
                                <Grid item xs={12} md={6} lg={4} key={job._id}>
                                    <Card
                                        sx={{
                                            boxShadow: 5,
                                            padding: 2,
                                            borderRadius: 2,
                                            background: 'linear-gradient(135deg, #F3F4F6 0%, #FFFFFF 100%)',
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                background: 'linear-gradient(135deg, #E3E4E6 0%, #FAFAFA 100%)',
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                                {job.jobTitle}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {job.companyName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Location: {job.location}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {new Date(job.psotedAt).toLocaleDateString()}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                        <IconButton onClick={() => navigate(`/job/updateJob/${job._id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteDialogOpen(job._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={() => navigate(`/profile/appliedstudents/${job._id}`)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                            
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>

            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>To update your profile details, please edit the fields below.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={updatedDetails.name || ''}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="phoneNo"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        value={updatedDetails.phoneNo || ''}
                        onChange={handleChange}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open} onClose={handleDeleteDialogClose}>
                <DialogTitle>Delete Job</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this job? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </Container>
    );
};

export default Profile;
