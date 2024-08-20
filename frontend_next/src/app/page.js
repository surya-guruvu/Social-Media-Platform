'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import SendVerificationEmailPage from "./components/SendVerificationEmailPage";
import { Typography, Button, Container, Box } from '@mui/material';
import axios from "axios";

export default function HomePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [oAuthUser,setOAuthUser] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken != null) {
      setAuthenticated(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    setAuthenticated(false);
  };

  useEffect(()=>{
    if(!authenticated){
      setOAuthUser(false);
    }
    else{
      const jwtToken = localStorage.getItem('jwtToken');
      axios.get('http://localhost:8080/oAuthVerify',
        {
          headers: { 'Authorization': `Bearer ${jwtToken}` }
        }
      )
      .then((response)=>{ 
        console.log("oAuthUser");
        console.log(response.data);
        setOAuthUser(response.data);
      })
      .catch((err)=>{
        console.log(err);
        setOAuthUser(false);
      })
    }
  },[authenticated]);

  return (
    <Container>
      <Typography variant="h5" component="p" gutterBottom>
        Welcome to SM platform
      </Typography>

      <Box sx={{ mt: 2 }}>
        {authenticated ? (
          <Typography variant="body1">You are successfully authenticated</Typography>
        ) : (
          <Button variant="contained" color="primary" component={Link} href="/login">
            Login
          </Button>
        )}
      </Box>

      {(authenticated) && (
        <>
          <Box sx={{ mt: 4 }}>
            <Button variant="outlined" color="secondary" onClick={handleSignOut}>
              Sign out
            </Button>
          </Box>

          {!oAuthUser &&
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" color="primary" component={Link} href="/updateEmail">
                Add/Update Email
              </Button>
              <SendVerificationEmailPage />
            </Box>
          }
        </>
      )}

    </Container>
  );
}
