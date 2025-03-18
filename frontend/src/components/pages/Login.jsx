import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import { Circles } from 'react-loader-spinner'; // Import spinner component

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Student', // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    try {
      const response = await axios.post("http://localhost:4000/api/v1/logIn", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        
        if (token) {
          Cookies.set('authToken', token, { expires: 7 });
          setIsLoggedIn(true);
          toast.success('User is logged in successfully');
          navigate('/');
        } else {
          toast.error("Login failed. Please try again.");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('User does not exist');
      } else if (error.response && error.response.status === 402) {
        toast.error('Access denied for the current role');
      } else if (error.response && error.response.status === 403) {
        toast.error('Incorrect password');
      } else {
        toast.error('An error occurred while trying to log in.');
      }
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Circles
            height="80"
            width="80"
            color="#007bff"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-80 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded"
            required 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded"
              required 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-2 top-2"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        
        <fieldset className="mb-4">
          <legend className="block text-gray-700 mb-2">Role</legend>
          <div className="flex items-center">
            <input 
              type="radio" 
              id="student" 
              name="role" 
              value="Student" 
              checked={formData.role === 'Student'} 
              onChange={handleChange} 
              className="mr-2"
            />
            <label htmlFor="student" className="text-gray-700">Student</label>
          </div>
          <div className="flex items-center mt-2">
            <input 
              type="radio" 
              id="recruiter" 
              name="role" 
              value="Recruiter" 
              checked={formData.role === 'Recruiter'} 
              onChange={handleChange} 
              className="mr-2"
            />
            <label htmlFor="recruiter" className="text-gray-700">Recruiter</label>
          </div>
        </fieldset>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </form>
      <ToastContainer /> {/* Add ToastContainer to display toasts */}
    </div>
  );
}

export default Login;
