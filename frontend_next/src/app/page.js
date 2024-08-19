'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import SendVerificationEmailPage from "./components/SendVerificationEmailPage";

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

    <br/><br/>
    
    
    {!authenticated ? <></> :<button onClick={handleSignOut}>Sign out</button>}

    <br/><br/>

    {/* <SendVerificationEmailPage/> */}

    {authenticated ? <Link href='/updateEmail'>Add/Update Email</Link>: <></>}

    {authenticated ? <SendVerificationEmailPage/>:<></>}

    </>
  );

  
}
