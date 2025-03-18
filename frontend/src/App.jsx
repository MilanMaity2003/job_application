import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Jobs from './components/pages/Jobs';
import Category from './components/pages/Category';
import About from './components/pages/About';
import Profile from './components/pages/Profile';
import Navbar from './components/Navbar';
import SignUp from './components/pages/Signup';
import Login from './components/pages/Login';
import Apply from './components/pages/Apply';
import Create from './components/pages/Create';
import Applications from './components/pages/Applications';
import AppliedStudent from './components/pages/AppliedStudent'; // Import the new component
import Cookies from 'js-cookie';
import UpdateJob from './components/pages/UpdateJob';
import Resources from './components/pages/Resources';
import Mentorship from './components/pages/Mentorship';
import Counselling from './components/pages/Counseling';
import Axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('Student');
  const [formData, setFormData] = useState({});
  const[isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    // Check for the presence of the cookie on component mount
    const token = Cookies.get('authToken');
    if (token) {
      setIsLoggedIn(true);
      // Fetch user data from the server to determine the role and other info
      const fetchUserData = async () => {
        try {
          const response = await Axios.get('http://localhost:4000/api/v1/getUser', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          const userData = response.data.user || {};
          setRole(userData.role || 'Student');
          setFormData(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    } else {
      setIsLoggedIn(false);
      setRole('Student'); // Default role if not logged in
    }
  }, []);

  useEffect(() => {
    console.log('App role:', role); // Check if role is correctly set
  }, [role]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/category' element={<Category />} />
        <Route path='/profile' element={<Profile role={role} formData={formData} />} />
        <Route path='/createjob' element={<Create />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/Mentorship" element={<Mentorship />} />
        <Route path="/Counselling" element={<Counselling />} />
        <Route path='/jobs' element={<Jobs role={role} isLoggedIn = {isLoggedIn} isApplied = {isApplied}/>} />
        <Route path='/signup' element={<SignUp setRole={setRole} setIsLoggedIn={setIsLoggedIn} setFormData={setFormData} />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
        <Route path='/apply/:id' element={<Apply setIsApplied = {setIsApplied}/>} />
        <Route path='/profile/applications/:jobId' element={<Applications />} />
        <Route path='/profile/appliedstudents/:jobId' element={<AppliedStudent />} /> {/* New Route */}
        <Route path="job/updateJob/:jobId" element={<UpdateJob />} />
      </Routes>
    </>
  );
}

export default App;
