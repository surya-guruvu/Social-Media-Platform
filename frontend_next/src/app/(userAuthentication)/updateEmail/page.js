"use client"

import axios from "axios";
import { useState } from "react";



const AddUpdateEmailPage = ()=>{
    
    const [message,setMessage] = useState('');
    const [err,setErr] = useState('');
    const [emailAddress,setEmailAddress] = useState('');
    const [loading,setLoading] = useState(false);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        const jwtToken = localStorage.getItem('jwtToken');

        setLoading(true);

        axios.post("http://localhost:8080/addOrUpdateEmail",
            {
                emailAddress
            },    
        {
            'headers':{'Authorization': `Bearer ${jwtToken}`}
        }

        )
        .then((response)=>{
            setErr('');
            setMessage(response.data);
            setLoading(false)
        })
        .catch((err)=>{
            console.log("YEAH")
            console.log(err.message);
            setErr(err);
            setMessage('');
            setLoading(false);
        });
    }

    return (
        <>
        {
            !loading ? (
                !message ? (
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            required
                        />
                        <button type="submit">
                            Add/Update Email
                        </button>
                    </form>
                ) : (
                    <h1>{message}</h1>
                )
            ) : (
                <h1>loading</h1>
            )
        }

        {
            (err && (
            err.response && err.response.data ? (
                <h1>{err.response.data}</h1>
            ) : (
                <h1>{err.message}</h1>
            )
            ))
        }


        </>
    );

}

export default AddUpdateEmailPage;
