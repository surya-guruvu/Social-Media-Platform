'use client'

import { Psychology } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from 'react';
import PostCard from "./PostCard";

const Posts = ({ userUniqueId, username, currentUserUniqueId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:8080/posts/userUniqueId?userUniqueId=${userUniqueId}`, {
          headers: { Authorization: `Bearer ${jwtToken}` }
        });

        setPosts(response.data);


      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [userUniqueId]);

  return (
    <div>
      {
        posts.map((post)=>{
          const jsonString = post.content;
          const obj = JSON.parse(jsonString); 

          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const dateCur = new Date(post.timeStamp);
          const formattedDate = dateCur.toLocaleDateString('en-US', options);


          return <PostCard key={post.id} content={obj.text} date={formattedDate} name={username} actId={post.activityId} id={post.id} currentUserUniqueId={currentUserUniqueId}/>
        })
      }

    </div>
  );
};

export default Posts;
