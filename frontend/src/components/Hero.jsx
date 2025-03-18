import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Check for the presence of authToken or token cookie
    const authToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];

    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (authToken || token) {
      navigate('/jobs'); // Navigate to jobs page if logged in
    } else {
      navigate('/signup'); // Navigate to signup page if not logged in
    }
  };

  const handleLearnMore = () => {
    navigate('/about'); // Navigate to About Us page
  };

  return (
    <div className="hero-section bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center py-20 px-4">
      <h1 className="text-5xl font-bold mb-4">Revolutionize Your Job Search</h1>
      <p className="text-lg mb-8">
        Our AI-driven platform connects you with the perfect job opportunities tailored to your skills and interests. 
        Let technology take your career to the next level.
      </p>
      <div className="mt-6">
        <button
          onClick={handleGetStarted}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
        >
          Get Started
        </button>
        <button
          onClick={handleLearnMore}
          className="ml-4 bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out"
        >
          Learn More
        </button>
      </div>
      <div className="mt-10 flex justify-center items-center space-x-4">
        {/* Removed the AI image */}
        <img src="https://i.pinimg.com/474x/f1/08/f9/f108f928ab6566f49a93d1962b6251f0.jpg" className="w-48 h-[127px] border-amber-950 rounded-lg" />
      </div>
    </div>
  );
};

export default HeroSection;
