'use Client'

import apiClient from "@/app/lib/apiClient";
import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";



const FollowingTab = ({userUniqueId,loggedInUserUniqueId})=>{

    const [following,setFollowing] = useState([]);
    const [unFollowedUser,setUnFollowedUsers] = useState([]);

    useEffect(()=>{

        if(!userUniqueId){
            return;
        }

        const jwtToken = localStorage.getItem('jwtToken');
        apiClient.get(`/follow/getfollowing?userUniqueId=${userUniqueId}`,
            {
                headers: { Authorization: `Bearer ${jwtToken}` }
            }
        )
        .then((res)=>{
            setFollowing(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        });

    },[userUniqueId]);

    const handleFollow = (followUserUniqueId)=>{
        const followerUniqueId = loggedInUserUniqueId;
        const followeeUniqueId = followUserUniqueId;
        const jwtToken = localStorage.getItem('jwtToken');

        apiClient.post(`/follow/addFollower`,
            {followeeUniqueId,followerUniqueId},
            {headers: { Authorization: `Bearer ${jwtToken}` }}
        )
        .then((res)=>{
             const updatedFollowing = following.map(follower =>{
                if(follower.uniqueId == followUserUniqueId){
                    return {...follower,followedByLoggedInUser: true}
                }
                return follower
             })

             setFollowing(updatedFollowing)
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    const handleUnFollow = (followUserUniqueId)=>{
        const followerUniqueId = userUniqueId;
        const followeeUniqueId = followUserUniqueId;
        const jwtToken = localStorage.getItem('jwtToken');

        apiClient.get(`/follow/unFollow?userUniqueId=${followUserUniqueId}`,
            {headers: { Authorization: `Bearer ${jwtToken}` }}
        )
        .then((res)=>{
            setUnFollowedUsers((prevUnfollowed)=>[...prevUnfollowed,followUserUniqueId])
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    return(
        <>
            <Typography variant="h6" gutterBottom>
                Following
            </Typography>

            {following.length > 0 ? (
                <Grid container spacing={3}>
                    {following.map((user) => (


                    <Grid item xs={12} sm={6} md={6} key={user.uniqueId}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box display="flex" alignItems="center">
                                        <Avatar
                                            alt={user.username}
                                            src={user.profileImageUrl} // Assuming user has profile image URL
                                            sx={{ width: 56, height: 56, marginRight: 1 }}
                                            
                                        />

                                        

                                        <Box component={Link} sx={{ color: '#333333', cursor: 'pointer', textDecoration: 'none'}} href={`/profile/${user.uniqueId}`}>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    fontWeight: 'bold', 
                                                    '&:hover': {
                                                        textDecoration: 'underline'
                                                    }
                                                }}
                                            >
                                                    {user.username?user.username:user.name}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {userUniqueId==loggedInUserUniqueId &&
                                    <Button size="small" variant="contained" color="primary" onClick={() => {handleUnFollow(user.uniqueId)}}
                                        disabled={unFollowedUser.includes(user.uniqueId)}
                                        >
                                        {unFollowedUser.includes(user.uniqueId) ? 'unFollowed': 'unFollow'}
                                    </Button>
                                    }
                                    {userUniqueId!=loggedInUserUniqueId &&
                                        <Button size="small" variant="contained" color="primary" onClick={() => {handleFollow(user.uniqueId)}}
                                        disabled={user.followedByLoggedInUser}
                                        
                                        >
                                        {user.followedByLoggedInUser ? 'Following': 'Follow'}
                                        </Button>
                                    }


                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    ))}
                </Grid>
            ) : (
                <Typography>Not following anyone</Typography>
            )}
        </>
    )

}

export default FollowingTab;