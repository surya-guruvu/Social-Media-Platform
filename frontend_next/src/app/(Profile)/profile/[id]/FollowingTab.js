'use Client'

import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";



const FollowingTab = ({userUniqueId})=>{

    const [following,setFollowing] = useState([]);
    const [unFollowedUser,setUnFollowedUsers] = useState([]);

    useEffect(()=>{

        if(!userUniqueId){
            return;
        }

        const jwtToken = localStorage.getItem('jwtToken');
        axios.get(`http://localhost:8080/follow/getfollowing?userUniqueId=${userUniqueId}`,
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

    const handleUnFollow = (followUserUniqueId)=>{
        const followerUniqueId = userUniqueId;
        const followeeUniqueId = followUserUniqueId;
        const jwtToken = localStorage.getItem('jwtToken');

        axios.get(`http://localhost:8080/follow/unFollow?userUniqueId=${followUserUniqueId}`,
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
                                  
                                        <Box>
                                            {user.username?
                                                <Typography>{user.username}</Typography>
                                            :
                                                <Typography>{user.name}</Typography>
                                            }
                                        </Box>
                                    </Box>

                                    <Button size="small" variant="contained" color="primary" onClick={() => {handleUnFollow(user.uniqueId)}}
                                        disabled={unFollowedUser.includes(user.uniqueId)}
                                        >
                                        {unFollowedUser.includes(user.uniqueId) ? 'unFollowed': 'unFollow'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    ))}
                </Grid>
            ) : (
                <Typography>You are not following anyone</Typography>
            )}
        </>
    )

}

export default FollowingTab;