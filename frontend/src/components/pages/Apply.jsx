import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Apply = ({setIsApplied}) => {
  const { id } = useParams(); // Get job id from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    resume: null,
    gender: ''
  });
  const [loading, setLoading] = useState(false);

  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];

  // Fetch user data to pre-fill email
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/getUser', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setFormData({
          ...formData,
          email: response.data.user.email,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.phoneNo.length !== 10) {
      alert('Phone number must be 10 digits.');
      setLoading(false);
      return;
    }

    if (formData.resume) {
      const allowedFileTypes = ['image/png', 'image/jpeg'];
      if (!allowedFileTypes.includes(formData.resume?.type)) {
        alert('Only PNG and JPG files are allowed for the resume.');
        setLoading(false);
        return;
      }
    }

    const applicationData = new FormData();
    applicationData.append('name', formData.name);
    applicationData.append('email', formData.email);
    applicationData.append('phoneNo', formData.phoneNo);
    if (formData.resume) {
      applicationData.append('resume', formData.resume);
    }
    applicationData.append('gender', formData.gender);

    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/application/apply/${id}`,
        applicationData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Application Submitted:', response.data);
      // setIsApplied(true);
      toast.success('Application submitted successfully!', {
        position: "top-center",
        autoClose: 1000,
        onClose: () => navigate('/Jobs'),
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <ToastContainer />
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border border-gray-300 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-150 ease-in-out"
        >
          <ArrowBackIcon />
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Apply for Job</h1>
        <h3 className="text-lg text-gray-600 mb-8 text-center"></h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number:</label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-150 ease-in-out"
              pattern="\d{10}"
              title="Phone number must be 10 digits"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Resume (PNG or JPG only):</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition duration-150 ease-in-out"
              accept=".png, .jpg, .jpeg"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Gender:</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  required
                  className="form-radio text-blue-600"
                />{' '}
                <span className="ml-2">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  required
                  className="form-radio text-pink-600"
                />{' '}
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-indigo-500 transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="w-6 h-6 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4zm12 0a6 6 0 00-6-6v-2a8 8 0 018 8h-2zm-6 6a8 8 0 01-8-8h2a6 6 0 006 6v2zm8-8a6 6 0 00-6-6v2a8 8 0 018 8h-2z"
                  ></path>
                </svg>
              </div>
            ) : (
              'Submit Application'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
