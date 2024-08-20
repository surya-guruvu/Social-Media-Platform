"use client";

import axios from "axios";
import { useState } from "react";
import { TextField, Button, CircularProgress, Typography, Container, Box, Alert } from '@mui/material';

const AddUpdateEmailPage = () => {
  const [message, setMessage] = useState('');
  const [err, setErr] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem('jwtToken');

    setLoading(true);

    axios.post("http://localhost:8080/addOrUpdateEmail",
      { emailAddress },
      {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
      }
    )
      .then((response) => {
        setErr('');
        setMessage(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err.message);
        setErr(err);
        setMessage('');
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm">
      {!loading ? (
        !message ? (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              type="email"
              label="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add/Update Email
            </Button>
          </Box>
        ) : (
          <Typography variant="h5" sx={{ mt: 3 }}>
            {message}
          </Typography>
        )
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {err && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="error">
            {err.response && err.response.data ? err.response.data : err.message}
          </Alert>
        </Box>
      )}
    </Container>
  );
};

export default AddUpdateEmailPage;
