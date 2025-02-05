import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import useFetch from '../hooks/useFetch'; // Import useFetch

const SignUpForm = ({ onSignupSuccess, onSignupFailure }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false); // Track form submission state

  // This function will run when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    if (username && password) {
      setSubmitClicked(true); // Set submitClicked to true to trigger the fetch
    } else {
      setError('Please fill in both username and password.');
    }
  };

  // Fetch the signup data only after form submission
  const { data, loading, error: fetchError } = useFetch(
    submitClicked ? 'http://localhost:5000/api/auth/register' : null, // Trigger fetch only if submitClicked is true
    'POST',
    { username, password },
    { 'Content-Type': 'application/json' }
  );

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message || 'An error occurred during registration');
      onSignupFailure(fetchError.message || 'An error occurred during registration');
    }
  }, [fetchError, onSignupFailure]);

  useEffect(() => {
    if (data && data.token) {
      localStorage.setItem('authToken', data.token); // Store token in localStorage
      onSignupSuccess(data.token); // Notify parent component of success
    }
  }, [data, onSignupSuccess]);

  return (
    <Box className="form-wrapper">
      <h1>Sign Up</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>} {/* Show error message */}
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <Box className="control">
          <div className="block-cube">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: 'transparent',
                  color: '#fff',
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                },
              }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
            />
          </div>
        </Box>

        {/* Password Field */}
        <Box className="control">
          <div className="block-cube">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: 'transparent',
                  color: '#fff',
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
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
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderColor: '#fff',
            },
          }}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
