
'use client';

import { useState } from 'react';
import { Grid, Tabs, Tab, Paper, Typography, Box } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, pad, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      {...other}
      sx={{
        padding: pad || '1rem',
        animation: 'fadeIn 0.3s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      {children}
    </Box>
  );
}

const AboutTab = () => {
  const [selectedAboutTab, setSelectedAboutTab] = useState(0);
  
  const handleAboutTabChange = (event, newValue) => {
    setSelectedAboutTab(newValue);
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} md={3}>
        <Tabs
          value={selectedAboutTab}
          onChange={handleAboutTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="about sections"
          orientation="vertical"
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
          <Tab label="Overview" />
          <Tab label="Work and Education" />
          <Tab label="Contact Info" />
          <Tab label="Hobbies" />
          <Tab label="Family and Relationship" />
        </Tabs>
      </Grid>

      <Grid item xs={12} md={9}>
        <Paper sx={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <TabPanel value={selectedAboutTab} index={0}>
            <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>Overview</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>Overview content goes here.</Typography>
          </TabPanel>
          <TabPanel value={selectedAboutTab} index={1}>
            <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>Work and Education</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>Work and education details go here.</Typography>
          </TabPanel>
          <TabPanel value={selectedAboutTab} index={2}>
            <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>Contact Info</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>Contact information goes here.</Typography>
          </TabPanel>
          <TabPanel value={selectedAboutTab} index={3}>
            <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>Hobbies</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>Hobbies information goes here.</Typography>
          </TabPanel>
          <TabPanel value={selectedAboutTab} index={4}>
            <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>Family and Relationship</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>Family and relationship details go here.</Typography>
          </TabPanel>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AboutTab;




