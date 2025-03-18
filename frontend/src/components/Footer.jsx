import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AnimatedCursor from "react-animated-cursor"
function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (showCursor) {
        setMousePosition({ x: event.clientX, y: event.clientY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showCursor]);

  const handleMouseEnter = () => setShowCursor(true);
  const handleMouseLeave = () => setShowCursor(false);

  return (
    <Box 
      sx={{
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 4,
        mt: 5,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Custom Cursor */}
      {showCursor && (
        <Box
          sx={{
            position: 'absolute',
            top: mousePosition.y + 10, // Adjust to position below and to the right of the mouse
            left: mousePosition.x + 10,
            width: 24,
            height: 24,
            bgcolor: 'white',
            borderRadius: '50%',
            pointerEvents: 'none',  // Prevent blocking other elements
            transition: 'transform 0.15s ease-in-out',
            zIndex: 1000,
          }}
        />
      )}

      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Box>
              <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                About Us
              </Link>
              <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Careers
              </Link>
              <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Press
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Box>
              <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Help Center
              </Link>
              <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Contact Us
              </Link>
              <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                FAQs
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <Link href="https://www.facebook.com" color="inherit" target="_blank" rel="noopener" sx={{ display: 'block', mb: 1 }}>
                <FacebookIcon />
              </Link>
              <Link href="https://www.twitter.com" color="inherit" target="_blank" rel="noopener" sx={{ display: 'block', mb: 1 }}>
                <TwitterIcon />
              </Link>
              <Link href="https://www.instagram.com" color="inherit" target="_blank" rel="noopener" sx={{ display: 'block', mb: 1 }}>
                <InstagramIcon />
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box mt={5} textAlign="center">
          <Typography variant="body2" color="inherit">
            © 2024 Job Elevate Hub. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;





























