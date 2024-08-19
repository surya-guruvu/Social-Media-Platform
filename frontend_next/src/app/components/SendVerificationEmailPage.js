"use client"

import axios from "axios";
import { useState } from "react";



const SendVerificationEmailPage = ()=>{

    
    const [message,setMessage] = useState('');
    const [err,setErr] = useState('');

    const handleClick = ()=>{
        const jwtToken = localStorage.getItem('jwtToken');

        axios.get("http://localhost:8080/sendVerficationEmail",{
            'headers':{'Authorization': `Bearer ${jwtToken}`}
        })
        .then((response)=>{
            setMessage(response.data);
        })
        .catch((err)=>{
            setErr(err.response.data);
        });
    }

    return (
        <>
        {!(message)?
            <button onClick={handleClick}>
                verifyEmail
            </button>
            :
            <h1>message</h1>
        }

        {err && <h1>{err}</h1>}

        </>
    );
}

export default SendVerificationEmailPage;