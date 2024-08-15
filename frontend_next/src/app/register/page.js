"use client"
import { useState } from 'react';
import styles from '@/app/styles/Register.module.css';
import axios from 'axios';
import Notification from '@/app/components/NotificationComponent';

const Register = ()=>{

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading]   = useState(false);
    const [error,setError]       = useState('');
    const [success,setSuccess] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        setShowNotification(false);

        axios.post("http://localhost:8080/register",
            {
                'username':username,
                'password':password
            },
            { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response)=>{
            setSuccess(true);
        })
        .catch((error)=>{
            console.log(error.message);
            setShowNotification(true);
            setError(error.message);
        });

        setLoading(false);


    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register</h1>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
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
                    {loading ? 'Registering...' : 'Register'}
                </button>

            </form>

            {success && <p>Registration success</p>}
      
            {showNotification && (
                <Notification message={error} onClose={() => setShowNotification(false)} />
            )}
        
        </div>
    )
}

export default Register;