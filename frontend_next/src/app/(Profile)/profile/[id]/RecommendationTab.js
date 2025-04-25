'use client'
import apiClient from "@/app/lib/apiClient";
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


const ReccomendationTab = ({userUniqueId})=>{

    const [recommendations,setRecommendations] = useState([]);
    const [followedUsers,setFollowedUsers] = useState([]);

    useEffect(()=>{

        if(!userUniqueId){
            return;
        }

        const jwtToken = localStorage.getItem('jwtToken');
        apiClient.get(`/getRecommendations?userUniqueId=${userUniqueId}`,
            {
                headers: { Authorization: `Bearer ${jwtToken}` }
            }
        )
        .then((res)=>{
            setRecommendations(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        });

    },[userUniqueId]);

    const handleFollow = (followUserUniqueId)=>{
        const followerUniqueId = userUniqueId;
        const followeeUniqueId = followUserUniqueId;
        const jwtToken = localStorage.getItem('jwtToken');

        apiClient.post(`/follow/addFollower`,
            {followeeUniqueId,followerUniqueId},
            {headers: { Authorization: `Bearer ${jwtToken}` }}
        )
        .then((res)=>{
            setFollowedUsers((prevFollowedUsers)=>[...prevFollowedUsers,followUserUniqueId])
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    return(
        <>
            <Typography variant="h6" gutterBottom>
                Recommended Friends
            </Typography>

            {recommendations.length > 0 ? (
                <Grid container spacing={3}>
                    {recommendations.map((recommendation) => (


                    <Grid item xs={12} sm={6} md={6} key={recommendation.uniqueId}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box display="flex" alignItems="center">
                                        <Avatar
                                            alt={recommendation.username}
                                            src={recommendation.profileImageUrl} // Assuming user has profile image URL
                                            sx={{ width: 56, height: 56, marginRight: 1 }}
                                            
                                        />
                                  
                                        <Box component={Link} sx={{ color: '#333333', cursor: 'pointer', textDecoration: 'none'}} href={`/profile/${recommendation.uniqueId}`}>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    fontWeight: 'bold', 
                                                    '&:hover': {
                                                        textDecoration: 'underline'
                                                    }
                                                }}
                                            >
                                                {recommendation.username?recommendation.username:recommendation.name}
                                            </Typography>

                                        </Box>
                                    </Box>

                                    <Button size="small" variant="contained" color="primary" onClick={() => {handleFollow(recommendation.uniqueId)}}
                                        disabled={followedUsers.includes(recommendation.uniqueId)}>
                                        {followedUsers.includes(recommendation.uniqueId)?'Following':'Follow'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    ))}
                </Grid>
            ) : (
                <Typography>No recommended friends</Typography>
            )}
        </>
    )

}


export default ReccomendationTab;