'use client';

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid } from '@mui/material';
import axios from 'axios';

const AvatarImage = ({ userUniqueId }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('/images/avatar.jpg'); // Default image path

  const handleAvatarClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const jwtToken = localStorage.getItem('jwtToken');

      if (jwtToken) {
        axios.post("http://localhost:8080/profile/ImageUpload", formData, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
          
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
      }
    }
  };

  const handleImageDelete = () => {

    const jwtToken = localStorage.getItem('jwtToken');

    if (userUniqueId) {
      axios.get(`http://localhost:8080/profile/deleteProfilePhoto?userUniqueId=${userUniqueId}`, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
      })
      .then((res) => {
        setImage('/images/avatar.jpg');
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (userUniqueId) {
      axios.get(`http://localhost:8080/profile/profilePhoto?userUniqueId=${userUniqueId}`, {
        responseType: 'blob' // Ensure the response is handled as a blob
      })
      .then((res) => {
        const imageBlob = new Blob([res.data], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(imageBlob);
        
        setImage(imageUrl);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, [userUniqueId]);

  return (
    <>
      <Avatar
        alt="User Name"
        src={image}
        sx={{ width: 80, height: 80, cursor: 'pointer' }}
        onClick={handleAvatarClick}
      />

      <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '400px', maxWidth: '90%' } }}>
        <Grid container spacing={1} justifyContent="right" padding="0.5rem">          
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>

        <Box sx={{ position: 'relative' }}>
          <Grid container spacing={1} justifyContent="center" padding="0.5rem">   
            <Avatar
              alt="User Name"
              src={image}
              sx={{ width: 100, height: 100, cursor: 'pointer', border: '1px solid #007bff' }}
            />
          </Grid>

          <DialogContent>
            <Grid container spacing={0} justifyContent="center">   
              <IconButton
                variant="contained"
                component="label"
                sx={{ mr: 4 }}
              >
                <PhotoCameraIcon />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  capture="user" 
                  onChange={handleImageUpload}
                />
              </IconButton>

              <IconButton
                color="error"
                onClick={handleImageDelete}
                sx={{ ml: 4 }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default AvatarImage;
