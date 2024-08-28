'use client';
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import SendVerificationEmailPage from "./components/SendVerificationEmailPage";
import { Typography, Button, Container, Box,Grid } from '@mui/material';
import axios from "axios";
import { AuthContext } from "./layout";

export default function HomePage() {
  const [authenticated, setAuthenticated] = useState(false);
  // const {authenticated, setAuthenticated} = useContext(AuthContext);
  const [oAuthUser,setOAuthUser] = useState(false);
  const [uniqueId,setUniqueId] = useState('');
  const [username,setUsername] = useState('');

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
    setUsername('');
    setUniqueId('');
    setOAuthUser(false);
    
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

        console.log(oAuthUser);
      })
      .catch((err)=>{
        console.log(err);
      });
    }
  },[authenticated]);

  return (
    <Container>
      <Typography variant="h5" component="p" gutterBottom>
        Welcome to SM platform
      </Typography>

      <Box sx={{ mt: 2 }}>
        {authenticated ? (
          <Typography variant="body1">Hi <Link href={`/profile/${uniqueId}`}>{ `${username}`}</Link></Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" component={Link} href="/login">
                Login
              </Button>
            </Grid>
            <Grid item xs>
              <Button variant="contained" color="primary" component={Link} href="/register">
                Create Account
              </Button>
            </Grid>
          </Grid>

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
