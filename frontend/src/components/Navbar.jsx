import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from './logo.png';
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import Axios from 'axios'; // Import Axios for API requests
import Avatar from '@mui/material/Avatar'; // Import Avatar component for user profile picture
import { toast } from 'react-toastify'; // Import toast for notifications
import onClickOutside from 'react-onclickoutside'; // Import click outside handler

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); // State for Category dropdown
    const [userDetails, setUserDetails] = useState(null);
    const [activeLink, setActiveLink] = useState('/'); // State for active link
    const [isSticky, setIsSticky] = useState(false); // State for sticky behavior
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    const dropdownRef = useRef(null); // Ref for the dropdown menu
    const categoryDropdownRef = useRef(null); // Ref for the Category dropdown menu

    useEffect(() => {
        // Check for the presence of the cookie
        const token = Cookies.get('authToken');
        if (token) {
            setIsLoggedIn(true); // Update state based on cookie presence
            fetchUserDetails(token); // Fetch user details if token exists
        } else {
            setIsLoggedIn(false); // Ensure state reflects absence of token
        }
    }, [setIsLoggedIn]);

    useEffect(() => {
        // Update active link based on current path
        setActiveLink(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        // Close dropdown when clicking outside of it
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setShowCategoryDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        // Handle sticky navbar on scroll
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Clean up the event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchUserDetails = async (token) => {
        try {
            const response = await Axios.get('http://localhost:4000/api/v1/getUser', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserDetails(response.data.user); // Set user details from response
        } catch (error) {
            console.error('Failed to fetch user details:', error);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleCategoryDropdown = () => {
        setShowCategoryDropdown(!showCategoryDropdown);
    };

    const handleLogout = async () => {
        try {
            Cookies.remove('authToken');
            Cookies.remove('token');
            setIsLoggedIn(false);
            setShowDropdown(false);
            navigate('/'); // Redirect to home page or login page
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleProfileClick = () => {
        navigate('/profile');
        setShowDropdown(false); // Close dropdown after navigating to profile
    };

    const handleLoginClick = () => {
        navigate('/login'); // Redirect to login page
    };

    const handleCategoryClick = (path) => {
        navigate(path);
        setShowCategoryDropdown(false); // Close category dropdown after clicking a link
    };

    return (
        <div 
            className={`w-full flex justify-between items-center ${isSticky ? 'sticky top-0 z-50 backdrop-blur-sm bg-white bg-opacity-80 shadow-md' : 'bg-white'} transition-all duration-300 ease-in-out`} 
        >
            <div className='flex items-center rounded-lg'>
                <img
                    className='h-16 w-20' // Adjusted height and width
                    src={logo}
                    alt="Logo"
                />
            </div>
            <div className="links flex gap-6">
                <Link 
                    to="/" 
                    className={`text-black px-4 py-1 rounded-xl transition-all duration-500 ease-in-out ${
                        activeLink === '/' 
                            ? 'border-2 border-black' 
                            : 'hover:bg-gray-200'
                    }`}
                >
                    Home
                </Link>
                <Link 
                    to="/Jobs" 
                    className={`text-black px-2 py-1 rounded-xl transition-all duration-500 ease-in-out ${
                        activeLink === '/Jobs' 
                            ? 'border-2 border-black' 
                            : 'hover:bg-gray-200'
                    }`}
                >
                    Jobs
                </Link>
                <div 
                    className="relative"
                    ref={categoryDropdownRef}
                >
                    <button
                        onClick={toggleCategoryDropdown}
                        className={`text-black px-2 py-1 rounded-xl transition-all duration-500 ease-in-out ${
                            activeLink === '/Category'
                                ? 'border-2 border-black'
                                : 'hover:bg-gray-200'
                        }`}
                    >
                        Category
                    </button>
                    {showCategoryDropdown && (
                        <div 
                            className="absolute bg-gray-200 bg-opacity-90 border border-black rounded-lg shadow-lg top-full mt-1 w-40 z-[1000000000]" 
                            style={{ zIndex: 1000000000 }}
                        >
                            <button
                                onClick={() => handleCategoryClick('/counselling')}
                                className="block px-4 py-2 text-black hover:bg-gray-300 w-full text-left"
                            >
                                Counselling
                            </button>
                            <button
                                onClick={() => handleCategoryClick('/mentorship')}
                                className="block px-4 py-2 text-black hover:bg-gray-300 w-full text-left"
                            >
                                Mentorship
                            </button>
                            <button
                                onClick={() => handleCategoryClick('/resources')}
                                className="block px-4 py-2 text-black hover:bg-gray-300 w-full text-left"
                            >
                                Resources
                            </button>
                        </div>
                    )}
                </div>
                <Link 
                    to="/About" 
                    className={`text-black px-2 py-1 rounded-xl transition-all duration-500 ease-in-out ${
                        activeLink === '/About' 
                            ? 'border-2 border-black' 
                            : 'hover:bg-gray-200'
                    }`}
                >
                    About Us
                </Link>
                {isLoggedIn ? (
                    <div className="relative z-50 flex items-center mr-6" ref={dropdownRef}>
                        <Avatar 
                            alt={userDetails?.name} 
                            src={userDetails?.image} // Display user avatar image
                            sx={{ width: 35, height: 35, cursor: 'pointer', }} // Adjusted size
                            onClick={toggleDropdown} // Use avatar to toggle dropdown
                        />
                        {showDropdown && (
                            <div className="absolute border-1 text-black bg-white right-0 mt-2 top-10 w-40 border-black rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform scale-100 opacity-100 z-[1000000000]">
                                <button 
                                    onClick={handleProfileClick} 
                                    className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left"
                                >
                                    Profile
                                </button>
                                <button 
                                    onClick={handleLogout} 
                                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button 
                            onClick={handleLoginClick} // Handle login click
                            className="text-black px-4 py-1 rounded-xl transition-all duration-500 ease-in-out hover:bg-gray-200"
                        >
                            Login
                        </button>
                        <button 
                            onClick={handleSignUpClick} 
                            className="text-black px-4 py-1 rounded-xl transition-all duration-500 ease-in-out hover:bg-gray-200"
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default onClickOutside(Navbar); // Wrap Navbar with onClickOutside to handle clicks outside
