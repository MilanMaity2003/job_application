import React from 'react';
import Page1 from '../Page1';
import Footer from '../Footer';
import TestimonialSlider from '../Testimonial';
// import Jobs from "../Jobs";
// import HomeJob from "../HomePage";
 import Subscription from '../Subscription'
import Hero from "../Hero"
// import Chatbot from "../Chatbot"
import { ToastContainer } from 'react-toastify';
// import zIndex from '@mui/material/styles/zIndex';

const Home = () => {
  return (
    <>
      <div>
        <ToastContainer />
         <Page1 /> 
        {/* <Chatbot style={{zIndex:"1000"}}/> */}
        <Hero/>
        {/* <HomeJob /> */}
         <TestimonialSlider /> 
         <Subscription/> 
         <Footer /> 

      </div>
    </>
  );
}

export default Home;
