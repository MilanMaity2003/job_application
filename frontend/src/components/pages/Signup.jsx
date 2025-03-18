import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast';

const Signup = ({ setIsLoggedIn, setRole, setFormData }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phoneNo: '',
    role: 'Student',
    resume: null,
    skills: '',
  });
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('phoneNo', user.phoneNo);
    formData.append('role', user.role);
    formData.append('resume', user.resume);
    formData.append('skills', user.skills);

    try {
      const response = await axios.post('http://localhost:4000/api/v1/signUp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log("the reponse",response);
      if (response.status === 200) {
        toast.success('Registration successful!');
        const { token, user: responseData } = response.data;
        if (token) {
         
          Cookies.set('authToken', token, { expires: 7 });
          setIsLoggedIn(true);
          setRole(responseData.role);
          setFormData(responseData);
          setUser({
            name: '',
            email: '',
            password: '',
            phoneNo: '',
            role: 'Student',
            resume: null,
            skills: '',
          });
          // toast.success('Registration successful!');
          navigate('/');
          console.log("responsedata",responseData);
        } else {
          toast.error('Token generation failed. Please try again.');
        }
      } 
    } catch (error) {
       if (error.response && error.response.status === 409) {
        toast.error('User already exists!');
      } else {
        console.error('Error:', error);
      toast.error('An error occurred while trying to register.');
      }
      
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center relative">
      <Toaster /> {/* Toaster for messages */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
      )} {/* Show spinner while loading */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInput}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            />
          </div>

          <div>
            <label htmlFor="phoneNo" className="block text-lg font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={user.phoneNo}
              onChange={handleInput}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-lg font-medium text-gray-700">Role</label>
            <select
              id="role"
              name="role"
              value={user.role}
              onChange={handleInput}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            >
              <option value="Student">Student</option>
              <option value="Recruiter">Recruiter</option>
            </select>
          </div>

          {user.role === 'Student' && (
            <>
              <div>
                <label htmlFor="resume" className="block text-lg font-medium text-gray-700">Resume</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".png, .jpg"
                  onChange={handleInput}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                />
              </div>

              <div>
                <label htmlFor="skills" className="block text-lg font-medium text-gray-700">Skills</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={user.skills}
                  onChange={handleInput}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <button onClick={() => navigate('/login')} className="text-indigo-600 hover:underline">
            Login here
          </button>
        </div>
      </div>
    </section>
  );
};

export default Signup;
