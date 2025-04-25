'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Container, Alert } from '@mui/material';
import apiClient from '@/app/lib/apiClient';

const VerifyPage = () => {
  const [message, setMessage] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const token = params.get('token');

    if (token) {
      apiClient.get(`/verifyEmail?token=${token}`)
        .then((response) => {
          setMessage(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setErr(error.response?.data || error.message);
          setLoading(false);
        });
    } else {
      setErr('No verification token provided.');
      setLoading(false);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {message && <Typography variant="h4" color="success.main">{message}</Typography>}
          {err && <Alert severity="error">{err}</Alert>}
        </>
      )}
    </Container>
  );
};

export default VerifyPage;
