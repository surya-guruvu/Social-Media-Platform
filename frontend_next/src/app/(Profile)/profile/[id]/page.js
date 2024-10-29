'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Paper, Tabs, Tab, Box, Grid, Alert, Button, Dialog, Snackbar } from '@mui/material';
import AvatarImage from './AvatarImage';
import { AuthContext } from '@/app/layout';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

import AboutTab from './AboutTab';
import PostDialogue from './PostDialogue';
import Posts from './Posts';
import TabPanel from './TabPanel';
import ReccomendationTab from './RecommendationTab';
import FollowingTab from './FollowingTab';
import FollowersTab from './FollowerTab';


const ProfilePage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [displayContent, setDisplayContent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const pageUserUniqueId = useParams().id;
  const currentUserUniqueId = useContext(AuthContext).uniqueId;
  const [openDialog, setOpenDialog] = useState(false);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  useEffect(() => {
    setDisplayContent(false);

    axios.get(`http://localhost:8080/profile/userProfile?userUniqueId=${pageUserUniqueId}`)
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setDisplayContent(true);
      })
      .catch((err) => {
        setDisplayContent(false);
        setErrorMessage(err.message);
      });
  }, [pageUserUniqueId]);

  return (
    <>
      {displayContent &&
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <AvatarImage userUniqueId={pageUserUniqueId} />
              </Grid>
            </Grid>

            <Typography variant="h5" align="center" sx={{ color: '#333', mt: 2 }} gutterBottom>
              {username}
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" sx={{ mb: 2 }}>
              {email}
            </Typography>

            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="inherit"
              aria-label="profile sections"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                '& .MuiTabs-indicator': {
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  height: '4px',
                },
                '& .MuiTab-root': {
                  color: '#333',
                  padding: '12px 16px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  textTransform: 'none',
                  transition: 'background-color 0.3s, color 0.3s',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#ffffff',
                    color: '#1976d2',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                  },
                },
              }}
            >
              <Tab label="Activity" />
              <Tab label="About" />
              <Tab label="Followers" />
              <Tab label="Following" />
              <Tab label="Photos" />
              {currentUserUniqueId==pageUserUniqueId && <Tab label="Find Friends" />}
            </Tabs>

          </Paper>

          <Paper sx={{ padding: 3, mt: 2, backgroundColor: '#fafafa' }}>
            {/* Activity Tab */}
            <TabPanel value={selectedTab} index={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ color: '#333' }}>Activity</Typography>
                {currentUserUniqueId === pageUserUniqueId &&
                  <Button variant='contained' color="primary" onClick={handleClickOpen}>Create a post</Button>
                }
                <PostDialogue open={openDialog} onClose={handleClose} userUniqueId={currentUserUniqueId} setSnackBarSeverity={setSnackBarSeverity} setSnackBarMessage={setSnackBarMessage} setSnackBarOpen={setSnackBarOpen} />
              </Box>
              <Posts userUniqueId={pageUserUniqueId} username={username} currentUserUniqueId={currentUserUniqueId}/>
            </TabPanel>

            {/* About Tab */}
            <TabPanel value={selectedTab} index={1}>
              <AboutTab />
            </TabPanel>

            {/* Followers Tab */}
            <TabPanel value={selectedTab} index={2}>
              <FollowersTab userUniqueId={pageUserUniqueId} loggedInUserUniqueId={currentUserUniqueId}></FollowersTab>
            </TabPanel>

            {/* Following Tab */}
            <TabPanel value={selectedTab} index={3}>
              <FollowingTab userUniqueId={pageUserUniqueId} loggedInUserUniqueId={currentUserUniqueId}></FollowingTab>
            </TabPanel>

            {/* Photos Tab */}
            <TabPanel value={selectedTab} index={4}>
              <Typography variant="h6" sx={{ color: '#333' }}>Photos</Typography>
              <Typography variant="body1">Photos uploaded by the user</Typography>
            </TabPanel>

            {/* Reccomendations Tab */}
            <TabPanel value={selectedTab} index={5}>
              <ReccomendationTab userUniqueId={currentUserUniqueId}/>
            </TabPanel>

          </Paper>
        </Container>
      }



      {errorMessage &&
        <Alert severity="error" onClose={() => router.push('/')} sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      }

      <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity={snackBarSeverity} variant="filled" sx={{ width: '100%' }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfilePage;
