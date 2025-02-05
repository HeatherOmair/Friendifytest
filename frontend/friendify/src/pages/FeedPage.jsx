import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch'; // Import the custom useFetch hook
import { TextField, Button, Box } from '@mui/material';
import '../CSS/FeedPage.css'; // Import custom CSS

const FeedPage = () => {
  const token = localStorage.getItem('token'); // Get token from localStorage

  // Fetch protected data using the useFetch hook
  const { loading, error } = useFetch(
    'http://localhost:5000/api/protected', 
    'GET', 
    null, 
    { Authorization: `Bearer ${token}` }  // Sending the token in headers
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error.message}</p>;
  }


  return (
    <>
      <div className="form-container">
        <Box className="form-wrapper">
          <form >
            <h2 style={{textAlign:'center'}}>Hey *user*</h2>
            
            {/* Post Field */}
            <Box className="control">
              <div className="block-cube">
                <TextField
                  label="Post something"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      backgroundColor: 'transparent',
                      color: '#fff',
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      borderColor: 'white'
                    },
                  }}
                  InputLabelProps={{
                    style: { color: '#fff' },
                  }}
                />
              </div>
            </Box>

            {/* Submit Button */}
            <Button
              className="btn"
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                padding: '14px 16px',
                color: '#fff',
                letterSpacing: '0.1em',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                fontSize: '16px',
                position: 'relative',
                overflow: 'hidden',
                borderColor: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(0, 212, 255, 1)',
                  borderColor: '#fff',
                },
              }}
              disabled={loading}
            >
              Post
            </Button>
          </form>
        </Box>
    </div>
    </>
  );
};

export default FeedPage;
