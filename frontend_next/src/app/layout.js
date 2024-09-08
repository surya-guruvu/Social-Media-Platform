'use client'
import { Inter } from "next/font/google";
import { createContext, useEffect, useState } from 'react';
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });


export const AuthContext = createContext();

export default function RootLayout({ children }) {

  const [authenticated, setAuthenticated] = useState(false);
  const [oAuthUser,setOAuthUser] = useState(false);
  const [uniqueId,setUniqueId] = useState('');
  const [username,setUsername] = useState('');
  const [emailVerified,setEmailVerified] = useState(false);
  const [email,setEmail] = useState('');

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken != null) {
      console.log('layout');
      setAuthenticated(true);
    }
  }, []);

  useEffect(()=>{
    setUsername('');
    setUniqueId('');
    setOAuthUser(false);
    setEmail('');
    
    if(authenticated){
      const jwtToken = localStorage.getItem('jwtToken');
      axios.get('http://localhost:8080/userUniqueId',
        {
          headers: { 'Authorization': `Bearer ${jwtToken}` }
        }
      )
      .then((response)=>{
        setUsername(response.data.username);
        setUniqueId(response.data.uniqueId);
        setOAuthUser(response.data.oauthUser);
        setEmail(response.data.email);
      })
      .catch((err)=>{

        if(err.message == "Network Error"){
          setAuthenticated(false);
          localStorage.removeItem(jwtToken);
        }

        console.log(err);
      });
    }
  },[authenticated]);
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext.Provider value={{authenticated,setAuthenticated,oAuthUser,setOAuthUser,uniqueId,setUniqueId,username,setUsername,emailVerified,setEmailVerified,email,setEmail}}>
          {children}
        </AuthContext.Provider>
        
      </body>
    </html>
  );
}
