'use client';

import axios from 'axios';
import { useState } from 'react';
import styles from '@/app/styles/Login.module.css'
import Notification from '@/app/components/NotificationComponent';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Link from 'next/link';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [success,setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission (like following the URL)

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8080/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data.jwt);
      const jwtToken = response.data.jwt;

      localStorage.setItem('jwtToken',jwtToken);

      setSuccess(true);

    } 
    catch (error) {
        console.log(error.message);
        setShowNotification(true);
        setError('Login failed. Please try again.');
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

      </form>

      {success && <p>Login success</p>}
      
      {showNotification && (
        <Notification message={error} onClose={() => setShowNotification(false)} />
      )}

      <GoogleSignInButton/>

      <Link href="/register">Register</Link>


    </div>
  );
};

export default Login;
