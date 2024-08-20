"use client";

import axios from "axios";
import { useState } from "react";
import { Button, CircularProgress, Typography, Container, Box, Alert } from '@mui/material';

const SendVerificationEmailPage = () => {
  const [message, setMessage] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    setLoading(true);

    axios.get("http://localhost:8080/sendVerficationEmail", {
      headers: { 'Authorization': `Bearer ${jwtToken}` }
    })
      .then((response) => {
        setMessage(response.data);
        setErr('');
        setLoading(false);
      })
      .catch((err) => {
        setErr(err.response ? err.response.data : err.message);
        setMessage('');
        setLoading(false);
      });
  }

  return (
    <>
      {!loading ? (
        !message ? (
          <Box sx={{ mt: 4 }}>
            <Button onClick={handleClick} variant="contained" color="primary">
              Verify Email
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
            {err}
          </Alert>
        </Box>
      )}
    </>
  );
}

export default SendVerificationEmailPage;
