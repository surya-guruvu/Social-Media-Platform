'use client'
import { useState } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await axios.post(
        'http://localhost:8080/updatePassword',
        { identifier, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setSuccess(true);
    } catch (error) {
      console.log(error.message);
      if(error.response && error.response.data){
        setError(error.response.data);
      }
      else{
        setError(error.message);
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Update Password
      </Typography>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Username/Email"
          variant="outlined"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Update Password'}
        </Button>
      </form>

      {success && <Typography variant="body1" color="success.main" align="center" mt={2}>Update successful</Typography>}
      
      {error && (
        <Alert severity="error" onClose={() => setError('')} sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
}

export default Register;
