'use client';

import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Button, TextField, Container, Typography, CircularProgress, Alert, Box, } from '@mui/material';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthContext } from '@/app/layout';
import apiClient from '@/app/lib/apiClient';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {authenticated, setAuthenticated} = useContext(AuthContext);
  const router = useRouter();
  

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    setSuccess(false);
    setAuthenticated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const response = await apiClient.post(
        'login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const jwtToken = response.data.jwt;
      localStorage.setItem('jwtToken', jwtToken);

      setSuccess(true);
      setAuthenticated(true);
      router.push('/');

    } catch (error) {
      console.log(error.message);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Debug");
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken != null) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      {!authenticated ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </form>

          {success && <Alert severity="success" sx={{ mt: 2 }}>Login success</Alert>}
          {error && <Alert severity="error" onClose={() => setError('')} sx={{ mt: 2 }}>{error}</Alert>}

          <Box sx={{ mt: 2 }}>
            <GoogleSignInButton />
          </Box>

          <Link href="/register" passHref>
            <Button sx={{ mt: 2 }}>Register</Button>
          </Link>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            You are signed in
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleSignOut} sx={{ mt: 2 }}>
            Sign out
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Login;
