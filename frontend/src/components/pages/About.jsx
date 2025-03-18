import React from 'react';
import { useSpring, animated } from 'react-spring';
import { 
  FaBriefcase, FaBookOpen, FaGraduationCap, FaChalkboardTeacher, FaUniversity, 
  FaBuilding, FaLaptopCode, FaHandshake, FaSearch, FaFileAlt 
} from 'react-icons/fa';

const AboutUs = () => {
  // Slide-in animation for the content cards
  const useSlideIn = (delay) =>
    useSpring({
      opacity: 1,
      transform: 'translateX(0)',
      from: { opacity: 0, transform: 'translateX(50%)' },
      config: { duration: 100, easing: (t) => t * (2 - t) },
      delay,
    });

  // Content sections
  const sections = [
    {
      title: 'Background',
      content: `Graduates face significant challenges in transitioning from education to employment. Our platform aims to address these hurdles with innovative solutions and support.`,
    },
    {
      title: 'Detailed Description',
      content: `We provide a comprehensive approach to job searching and career development, using advanced algorithms and AI to enhance job matching and career growth.`,
    },
    {
      title: 'Expected Solution',
      content: `Our solution focuses on improving job market connectivity, increasing access to diverse opportunities, and offering extensive career resources.`,
    },
    {
      title: 'Job Opportunities',
      content: `We offer a wide range of job opportunities across various sectors, including private, government, and international positions to meet diverse career needs.`,
    },
    {
      title: 'Counseling Services',
      content: `Our professional counseling services assist job seekers with career advice, resume building, and interview preparation to enhance their job search effectiveness.`,
    },
    {
      title: 'Internships and Training',
      content: `We provide dedicated sections for internships and industrial training, helping students gain practical experience and build valuable skills for their careers.`,
    },
    {
      title: 'Mentorship Programs',
      content: `Our mentorship programs pair students with industry professionals, offering valuable guidance and support to aid in career development and professional growth.`,
    },
    {
      title: 'Global Opportunities',
      content: `We expand access to international job opportunities, offering resources and support for those seeking employment abroad and global career advancement.`,
    },
    {
      title: 'AI-Driven Matchmaking',
      content: `Utilizing cutting-edge algorithms and AI technology, we match job seekers with the most suitable opportunities based on their skills and career aspirations.`,
    },
    {
      title: 'Resume and Application Tools',
      content: `Our platform includes tools and resources designed to streamline the resume building and job application processes, making job searching more efficient and effective.`,
    },
    {
      title: 'Student Support',
      content: `We offer comprehensive support to students, including career advice and resources to tackle early career challenges and enhance their job readiness.`,
    },
  ];
  

  return (
    <div className="relative p-6 overflow-hidden  mx-auto bg-gray-100 text-gray-900">
      {/* Streak Line */}
      <div className="absolute left-4 top-0 bottom-0 w-2 bg-zinc-200 border border-zinc-300"></div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold">About Us</h1>
      </div>

      {/* Content sections */}
      {sections.map((section, index) => {
        const slideInStyle = useSlideIn(index * 300);

        return (
          <div key={index} className="relative flex items-center mb-12">
            {/* Connecting line from the streak to the card */}
            <div className="absolute left-4 w-16 h-1 bg-zinc-200"></div>
            <div className="absolute left-[3.75rem] w-4 h-4 bg-zinc-200 rounded-full"></div>

            {/* Content Card */}
            <animated.div
              style={slideInStyle}
              className="ml-20 p-6 rounded-lg bg-white text-gray-900 shadow-lg transform"
            >
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <p>{section.content}</p>
            </animated.div>
          </div>
        );
      })}

      {/* Scattered Icons */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <FaBriefcase className="absolute top-10 left-10 w-12 h-12 text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:rotate-180" />
        <FaBookOpen className="absolute top-20 right-10 w-12 h-12 text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:rotate-180" />
        <FaGraduationCap className="absolute bottom-20 left-20 w-12 h-12 text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:rotate-180" />
        <FaChalkboardTeacher className="absolute bottom-10 right-20 w-12 h-12 text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:rotate-180" />
        <FaUniversity className="absolute top-2/4 left-1/4 w-12 h-12 text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:rotate-180" />
        <FaBuilding className="absolute top-1/4 right-20 w-12 h-12 text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:rotate-180" />
        <FaLaptopCode className="absolute bottom-1/4 left-1/4 w-12 h-12 text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:rotate-180" />
        <FaHandshake className="absolute top-1/4 left-10 w-12 h-12 text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:rotate-180" />
        <FaSearch className="absolute bottom-1/2 right-1/2 w-12 h-12 text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:rotate-180" />
        <FaFileAlt className="absolute bottom-1/4 right-1/4 w-12 h-12 text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:rotate-180" />
      </div>
    </div>
  );
};

export default AboutUs;
