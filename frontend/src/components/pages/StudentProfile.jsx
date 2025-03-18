import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Container,Avatar, Typography, Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const StudentProfile = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [profileDetails, setProfileDetails] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        resume: '',
        skills: ''
    });
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const token = Cookies.get('authToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await Axios.get('http://localhost:4000/api/v1/getUser', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const user = response.data.user;

                setProfileDetails({
                    name: user.name || '',
                    email: user.email || '',
                    phoneNumber: user.phoneNo || '',
                    resume: user.resume || '',
                    skills: user.skills || '',
                    image:user.image || '',
                });

                // Fetch applied jobs for the student
                const appliedJobsResponse = await Axios.get('http://localhost:4000/api/v1/application/appliedJob', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                setAppliedJobs(appliedJobsResponse.data.appliedJob);

            } catch (error) {
                console.error('Error fetching user details or applied jobs:', error.response?.data || error.message);
            }
        };

        fetchProfileDetails();
    }, []);

    const handleApplyMore = () => {
        navigate('/Jobs');
    };

    const handleEditProfile = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileDetails(prevState => ({
                ...prevState,
                resume: file
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                console.error('No token found');
                return;
            }

            const formData = new FormData();
            formData.append('name', profileDetails.name);
            formData.append('email', profileDetails.email);
            formData.append('phoneNumber', profileDetails.phoneNumber);
            formData.append('skills', profileDetails.skills);
            if (profileDetails.resume) {
                formData.append('resume', profileDetails.resume);
            }

            await Axios.put('http://localhost:4000/api/v1/update/profile', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            handleClose();
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message);
        }
    };

    return (
        <Container style={{ paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1">Student Profile</Typography>
                <Button variant="contained" color="primary" onClick={handleApplyMore}>
                    Apply More
                </Button>
            </div>

            <div style={{ display: 'flex', marginTop: '20px' }}>
                {/* Left side: Student Profile Details */}
                <Card style={{ height: '350px', flex: 1, marginRight: '20px', position: 'relative' }}>
                    <CardContent>
                        <Typography variant="h6">Profile Details</Typography>
                        <Avatar
                                src={profileDetails.image}
                                alt={profileDetails.name}
                                sx={{ width: 120, height: 120 }}
                            />
                        <Typography variant="body1"><strong>Name:</strong> {profileDetails.name}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {profileDetails.email}</Typography>
                        <Typography variant="body1"><strong>Resume:</strong> <a href={profileDetails.resume.url} style={{ color: 'blue' }}>Download Resume</a></Typography>
                        <Typography variant="body1"><strong>Phone No:</strong> {profileDetails.phoneNumber}</Typography>
                        <Typography variant="body1"><strong>Skills:</strong> {profileDetails.skills}</Typography>
                        <Button variant="outlined" color="primary" onClick={handleEditProfile} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                            Edit Profile
                        </Button>
                    </CardContent>
                </Card>

                {/* Right side: Applied Jobs */}
                <Card style={{ flex: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Applied Jobs</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sl No.</TableCell>
                                        <TableCell>Job Title</TableCell>
                                        <TableCell>Company Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {appliedJobs.length > 0 ? (
                                        appliedJobs.map((job, index) => (
                                            <TableRow key={job._id || index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{job.jobInfo.jobTitle}</TableCell>
                                                <TableCell>{job.jobInfo.companyName}</TableCell>
                                                
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                No jobs applied yet.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Edit Profile Form */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Profile</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            name="name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={profileDetails.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={profileDetails.email}
                            // onChange={handleChange}
                            // required
                        />
                        <TextField
                            margin="dense"
                            label="Phone Number"
                            name="phoneNumber"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={profileDetails.phoneNumber}
                            onChange={handleChange}
                            inputProps={{ maxLength: 10 }}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Resume"
                            name="resume"
                            type="file"
                            fullWidth
                            variant="standard"
                            onChange={handleFileChange}
                        />
                        <TextField
                            margin="dense"
                            label="Skills"
                            name="skills"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={profileDetails.skills}
                            onChange={handleChange}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};

export default StudentProfile;
