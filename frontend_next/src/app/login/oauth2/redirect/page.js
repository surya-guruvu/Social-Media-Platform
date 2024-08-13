'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




const OAuth2Callback = () => {

    const router = useRouter();


    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const encodedToken = params.get('token');
        const jwtToken = atob(encodedToken);
        
        localStorage.setItem('jwtToken',jwtToken);

        router.push('/');
    },[]);

    return (
        <>
            <div>You are successfully authenticated</div>
            <Link href='/'>Home</Link>
        </>
    );

    
};

export default OAuth2Callback;
