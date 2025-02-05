import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import '../CSS/SignInPage.css'; // Import custom CSS
import AnimatedWrapper from '../components/AnimatedWrapper'; // Assuming AnimatedWrapper is your animation component
import Ball from '../components/Ball'; // Assuming Ball is for your custom cursor
import useFetch from '../hooks/useFetch'; // Import custom hook

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between SignIn and SignUp
  const [error, setError] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false); // Track form submission state

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (username && password) {
      setSubmitClicked(true);
    } else {
      setError('Please fill in both username and password.');
    }
  };

  const { data, loading, error: fetchError } = useFetch(
    submitClicked ? `http://localhost:5000/api/auth/${isSignUp ? 'signup' : 'login'}` : null,
    'POST',
    { username, password },
    { 'Content-Type': 'application/json' }
  );

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message || 'An error occurred');
    }
  }, [fetchError]);

  useEffect(() => {
    if (data && data.token) {
      localStorage.setItem('authToken', data.token);
      window.location.href = '/feed';
    }
  }, [data]);

  return (
    <div className="wrapper">
      <div className="left-side">
        <AnimatedWrapper />
      </div>

      <div className="form-container">
        <Box className="form-wrapper">
          <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <Box className="control">
              <div className="block-cube">
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
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
              disabled={loading}
            >
              {loading ? (isSignUp ? 'Signing Up...' : 'Logging in...') : (isSignUp ? 'Sign Up' : 'Log In')}
            </Button>
          </form>

          {/* Toggle between SignIn and SignUp */}
          <div className="switch-form">
            <button
              className="switch-btn"
              onClick={() => setIsSignUp((prev) => !prev)}
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </Box>

        {/* Ball Cursor */}
        <Ball borderColor="rgba(0, 212, 255, 1)" />
      </div>
    </div>
  );
};

export default SignInPage;
