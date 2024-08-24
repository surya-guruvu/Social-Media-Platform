'use client';



import React, { useState } from 'react';
import { Container, Typography, Paper, Avatar, Tabs, Tab, Box, Grid } from '@mui/material';
import AvatarImage from './AvatarImage';

function TabPanel(props) {
  const { children, value, index,pad, ...other } = props;

  return (
    
        <Box
        role="tabpanel"
        hidden={value !== index}
        {...other}
        sx={{
            padding: pad,
          }}
        >
            {children}
        </Box>
  );
}

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedAboutTab, setSelectedAboutTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAboutTabChange = (event, newValue) => {
    setSelectedAboutTab(newValue);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={2} style={{ padding: '2rem' }}>
        <Grid container spacing={2} justifyContent="center">
            <Grid item>
                {/* <Avatar
                alt="User Name"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 80, height: 80 }}
                /> */}
                <AvatarImage/>
            </Grid>
        </Grid>
            
        <Typography variant="h5" align="center" gutterBottom>
            User Name
        </Typography>
            
        <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
            username@example.com
        </Typography>


        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          aria-label="profile sections"
          scrollButtons="auto"
        >
            <Tab label="Posts" wrapped/>
            <Tab label="About" />
            <Tab label="Followers" />
            <Tab label="Following" />
            <Tab label="Photos" />
        </Tabs>

        </Paper>

        <Paper style={{ padding: '2rem' }}>

        <TabPanel value={selectedTab} index={0}>
            <Typography variant="h6">Posts</Typography>
            <Typography variant="body1">These are posts of the user.</Typography>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
            <Grid container spacing={2} justifyContent="left">
              <Grid item xs={2}>
                <Tabs
                    value={selectedAboutTab}
                    onChange={handleAboutTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="profile sections"
                    orientation="vertical"
                    role="navigation"
                    sx={{
                    border: '1px solid #ddd',        // Border around the Tabs
                    borderRadius: '4px',             // Optional: rounded corners
                    backgroundColor: '#f9f9f9',     // Optional: background color
                    '& .MuiTabs-flexContainer': {
                    borderRight: '1px solid #ddd', // Border on the right of the tab container
                    },
                    '& .MuiTab-root': {
                        '&.Mui-selected': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Highlight color
                        borderRadius: '4px',
                        },
                    },
                    }}
                >
                    <Tab label="Overview" />
                    <Tab label="Contact Info" />
                    <Tab label="Hobbies" />
                    <Tab label="Life Events" />
                    <Tab label="Addtional Info" />
                </Tabs>
              </Grid>

              <Grid item xs = {9.5}>
                <Paper style={{ padding: '1rem', width:'100%' }}>
                  <TabPanel value={selectedAboutTab} index={0}>
                      <Typography variant="h6">Overview</Typography>
                      <Typography variant="body1">Overview</Typography>
                  </TabPanel>
                  <TabPanel value={selectedAboutTab} index={1}>
                      <Typography variant="h6">Contact</Typography>
                      <Typography variant="body1">Contact</Typography>
                  </TabPanel>
                  <TabPanel value={selectedAboutTab} index={2}>
                      <Typography variant="h6">Hobbies</Typography>
                      <Typography variant="body1">Hobbies</Typography>
                  </TabPanel>
                  <TabPanel value={selectedAboutTab} index={3}>
                      <Typography variant="h6">Life Events</Typography>
                      <Typography variant="body1">Life Events</Typography>
                  </TabPanel>
                  <TabPanel value={selectedAboutTab} index={4}>
                      <Typography variant="h6">Addtional Info</Typography>
                      <Typography variant="body1">Addtional Info</Typography>
                  </TabPanel>
                </Paper>
              </Grid>

            </Grid>
        </TabPanel>


        <TabPanel value={selectedTab} index={2}>
          <Typography variant="h6">Followers</Typography>
          <Typography variant="body1">User's Followers</Typography>
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          <Typography variant="h6">Following</Typography>
          <Typography variant="body1">User's followed by current user</Typography>
        </TabPanel>
        <TabPanel value={selectedTab} index={4}>
          <Typography variant="h6">Photos</Typography>
          <Typography variant="body1">Photos uploaded by the user</Typography>
        </TabPanel>

      </Paper>
    </Container>
  );
};

export default ProfilePage;