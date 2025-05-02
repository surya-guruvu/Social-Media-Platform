'use client'
import { Inter } from "next/font/google";
import { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "./lib/apiClient";
import { Query } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });


export const AuthContext = createContext();

export default function RootLayout({ children }) {

  const theme = useTheme();
  const [authenticated, setAuthenticated] = useState(false);
  const [oAuthUser,setOAuthUser] = useState(false);
  const [uniqueId,setUniqueId] = useState('');
  const [username,setUsername] = useState('');
  const [emailVerified,setEmailVerified] = useState(false);
  const [email,setEmail] = useState('');
  const router = useRouter();
  const queryClient = new QueryClient();

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken != null) {
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
      apiClient.get('userUniqueId',
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

        if(err.message == "Network Error" || err.message == "Request failed with status code 401"){
          setAuthenticated(false);
          localStorage.removeItem(jwtToken);
        }

        console.log(err);
      });
    }
  },[authenticated]);

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    setAuthenticated(false);
  };

  const handleClick = () =>{
    router.push('/');
  }
  

  return (
    <html lang="en">
      <body className={inter.className}>
      <AppBar position="static" sx={{ backgroundColor: '#1E90FF', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 1rem' }}>
        <Typography variant="h6" component="div" sx={{ color: '#fff', cursor: 'pointer'}} onClick={handleClick}>
          Ayrus SM Platform
        </Typography>
        <div>
          {!authenticated ? (
            <>
              <Button
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#1c6ea4', // Slightly darker shade for hover
                  },
                  marginRight: '1rem', // Space between buttons
                }}
                component={Link}
                href="/login"
              >
                Login
              </Button>
              <Button
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#1c6ea4', // Slightly darker shade for hover
                  },
                }}
                component={Link}
                href="/register"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
            <Button
              sx={{
                backgroundColor: '#1c6ea4',
                color: '#fff',
                textTransform: 'none',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: '#1c6ea4', // Slightly darker shade for hover
                },
                marginRight: '0.5rem'
              }}
              component={Link}
              href={`/profile/${uniqueId}`}
            >
              <Avatar sx={{ width: 24, height: 24, marginRight: '0.5rem' }}>
                  <AccountCircleIcon />
              </Avatar>
              {username}
            </Button>
            
            <Button
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#1c6ea4', // Slightly darker shade for hover
                  },
                  marginRight: '1rem', // Space between buttons
                }}
                onClick={handleSignOut}
              >
                 <LogoutIcon sx={{ marginRight: '0.5rem' }} />
                Sign out
              </Button>
            </>


          )}
        </div>
      </Toolbar>
    </AppBar>

        <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{authenticated,setAuthenticated,oAuthUser,setOAuthUser,uniqueId,setUniqueId,username,setUsername,emailVerified,setEmailVerified,email,setEmail}}>
          {children}
        </AuthContext.Provider>
        </QueryClientProvider>
        
      </body>
    </html>
  );
}
