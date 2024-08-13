'use client'
import Link from "next/link";
import { useEffect, useState } from "react";


export default function HomePage() {
  
  const [authenticated,setAuthenticated] = useState(false);
  

  useEffect(()=>{
    const jwtToken = localStorage.getItem('jwtToken');

    if(jwtToken != null){
      setAuthenticated(true);
    }
  });

  const handleSignOut = ()=>{
    localStorage.removeItem('jwtToken');
    setAuthenticated(false);
  }

  return (
    <>
    <p>Welcome to SM platform</p>

    {authenticated ? <>You are successfully authenticated</> :<Link href='/login'>Login</Link>}
    
    
    {!authenticated ? <></> :<button onClick={handleSignOut}>Sign out</button>}

    </>
  );

  
}
