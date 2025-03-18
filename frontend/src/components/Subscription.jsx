import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS

const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(''); // Clear any previous error

    // Sending email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { email }, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Email sent successfully:', response);
        setSuccess('Subscription successful! A greeting email has been sent.');
        setEmail(''); // Clear the input field
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setError('You really interested contact us now ');
      });
  };

  return (
    <div className="subscribe-section bg-gray-100 text-center p-8">
      <h2 className="text-3xl font-bold">Subscribe for Updates</h2>
      <p className="mt-2">Get the latest job alerts and career tips straight to your inbox.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex justify-center items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-2 rounded-lg border border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600"
        >
          Subscribe
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default SubscribeSection;
