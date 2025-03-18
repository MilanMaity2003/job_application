import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
const Page1 = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/jobs'); // Navigate to the jobs section
  };

  return (
    <div className="flex justify-between h-[450px] mb-20">
      <div className="left h-screen w-2/3 p-16 m-4">
        <h1 className="font-bold text-9xl">We Build</h1>
        <h2 className="font-bold text-8xl">" "Dreams" "</h2>
        <div className="flex items-center mt-12">
          <h5 className="text-5xl">Join with Us</h5>
          {/* SVG Button */}
          <button
            onClick={handleButtonClick}
            className="ml-4 flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 relative group"
          >
            {/* SVG Icon (arrow) */}
            <svg
              className="w-8 h-8 absolute transition-transform duration-500 ease-in-out group-hover:opacity-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2.75a.75.75 0 0 1 .75.75v7.69l5.53-5.53a.75.75 0 0 1 1.06 1.06L13.5 12.72a.75.75 0 0 1-1.06 0l-5.53-5.53a.75.75 0 0 1 1.06-1.06L12 10.19V3.5a.75.75 0 0 1 .75-.75z"
                clipRule="evenodd"
              />
            </svg>
            {/* SVG Icon (cross) */}
            <svg
              className="w-8 h-8 absolute opacity-0 transform transition-transform duration-500 ease-in-out group-hover:opacity-100 group-hover:rotate-[360deg] group-hover:animate-spin-slow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 6l-6 6-6-6a.75.75 0 0 1 1.06-1.06L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6 6 6a.75.75 0 0 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 1 1-1.06-1.06l6-6-6-6a.75.75 0 0 1 1.06-1.06L12 10.94l5.47-5.47a.75.75 0 0 1 1.06 1.06l-6 6 6-6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="right h-screen w-1/3">
        <ImageSlider />
      </div>
    </div>
  );
};

export default Page1;
