// 'use client';
// import Link from "next/link";
// import { useContext, useEffect, useState } from "react";
// import SendVerificationEmailPage from "./components/SendVerificationEmailPage";
// import { Typography, Button, Container, Box,Grid } from '@mui/material';
// import axios from "axios";
// import { AuthContext } from "./layout";

// export default function HomePage() {
//   const {authenticated,setAuthenticated,oAuthUser,setOAuthUser,uniqueId,setUniqueId,username,setUsername,emailVerified,setEmailVerified} = useContext(AuthContext);

//   const handleSignOut = () => {
//     localStorage.removeItem('jwtToken');
//     setAuthenticated(false);
//   };

//   return (
//     <Container>
//       <Typography variant="h5" component="p" gutterBottom>
//         Welcome to SM platform
//       </Typography>

//       <Box sx={{ mt: 2 }}>
//         {authenticated ? (
//           <Typography variant="body1">Hi <Link href={`/profile/${uniqueId}`}>{ `${username}`}</Link></Typography>
//         ) : (
//           <Grid container spacing={2}>
//             <Grid item>
//               <Button variant="contained" color="primary" component={Link} href="/login">
//                 Login
//               </Button>
//             </Grid>
//             <Grid item xs>
//               <Button variant="contained" color="primary" component={Link} href="/register">
//                 Create Account
//               </Button>
//             </Grid>
//           </Grid>

//         )}
//       </Box>

//       {(authenticated) && (
//         <>
//           <Box sx={{ mt: 4 }}>
//             <Button variant="outlined" color="secondary" onClick={handleSignOut}>
//               Sign out
//             </Button>
//           </Box>

//           {(!oAuthUser && !emailVerified) &&
//             <Box sx={{ mt: 4 }}>
//               <Button variant="contained" color="primary" component={Link} href="/updateEmail">
//                 Add/Update Email
//               </Button>
//               <SendVerificationEmailPage />
//             </Box>
//           }
//         </>
//       )}

//     </Container>
//   );
// }


'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper, Box, Card, CardContent, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>

      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: theme.palette.background.paper }}>
              <Typography variant="h4" gutterBottom>
                Welcome to Your Social Hub
              </Typography>
              <Typography variant="body1" paragraph>
                Connect with friends, share your thoughts, and stay updated with the latest trends.
              </Typography>
              <Button variant="contained" color="primary">Get Started</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image="/images/social-media.jpg"
                alt="Social Media"
                sx={{ height: 140 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  Discover New Connections
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Find people who share your interests and build lasting relationships.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" gutterBottom>
            Latest Posts
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3].map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post}>
                <Paper elevation={2} sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Post Title {post}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    This is a brief description of the post content. It provides a summary or an excerpt of what the post is about.
                  </Typography>
                  <Button variant="outlined" color="primary">Read More</Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
