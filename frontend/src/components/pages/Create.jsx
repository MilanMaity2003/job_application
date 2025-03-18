import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';

const Create = () => {
    const [form, setForm] = useState({
        jobTitle: '',
        location: '',
        jobType: '',
        companyName: '',
        jobDescription: '',
        jobNiche: '',
        qualifications: '',
        salary: '',
        jobDetails: '',
        requiredSkills: '',
        responsibilities: ''
    });

    const [jobNiches, setJobNiches] = useState([
        'Freelancing', 'Remote', 'On Site', 'Internship'
    ]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'jobType') {
            if (value === 'FullTime') {
                setJobNiches(prevNiches => 
                    prevNiches.includes('Internship') 
                        ? prevNiches.filter(niche => niche !== 'Internship') 
                        : prevNiches
                );

                setForm(prevForm => ({
                    ...prevForm,
                    jobType: value,
                    jobNiche: prevForm.jobNiche === 'Internship' ? '' : prevForm.jobNiche
                }));
            } else {
                setJobNiches(['Freelancing', 'Remote', 'On Site', 'Internship']);
                setForm(prevForm => ({
                    ...prevForm,
                    jobType: value
                }));
            }
        } else {
            setForm({
                ...form,
                [name]: value
            });
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

            const response = await Axios.post(
                'http://localhost:4000/api/v1/job/createJob',
                form,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Job created successfully:', response.data);
            navigate('/profile');
        } catch (error) {
            console.error('Error creating job:', error.response?.data || error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-4 p-2 text-blue-600 hover:underline"
            >
                ← Back
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">Create Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={form.jobTitle}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input 
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <select 
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select Job Type</option>
                    <option value="FullTime">Full Time</option>
                    <option value="PartTime">Part Time</option>
                </select>
                <select 
                    name="jobNiche"
                    value={form.jobNiche}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select Job Niche</option>
                    {jobNiches.map(niche => (
                        <option key={niche} value={niche}>{niche}</option>
                    ))}
                </select>
                <input 
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={form.companyName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea 
                    name="jobDescription"
                    placeholder="Job Description"
                    value={form.jobDescription}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                />
                <input 
                    type="text"
                    name="qualifications"
                    placeholder="Qualifications"
                    value={form.qualifications}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input 
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    value={form.salary}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea 
                    name="jobDetails"
                    placeholder="Job Details"
                    value={form.jobDetails}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                />
                <textarea 
                    name="requiredSkills"
                    placeholder="Required Skills"
                    value={form.requiredSkills}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                />
                <textarea 
                    name="responsibilities"
                    placeholder="Responsibilities"
                    value={form.responsibilities}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                />
                <button 
                    type="submit" 
                    className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Create;
