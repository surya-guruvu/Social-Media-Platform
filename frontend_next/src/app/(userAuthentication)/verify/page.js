"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import axios from 'axios';


const VerifyPage = ()=>{
    const [message,setMessage] = useState('');
    const [err,setErr] = useState('');



    // const router = useRouter();
    // const {token} = router.query;

    useEffect(() => {

        const query = window.location.search;
        const params = new URLSearchParams(query);
        const token = params.get('token');

        if(token){
            axios.get(`http://localhost:8080/verifyEmail?token=${token}`)
            .then((response)=>{
                setMessage(response.data);
            })
            .catch((err)=>{
                setErr(err);
            });
        }
    },[]);

    return (
        <>
            {message && <h1>{message}</h1>}
            {err && <h1>{err}</h1>}
        </>
    );


}

export default VerifyPage


