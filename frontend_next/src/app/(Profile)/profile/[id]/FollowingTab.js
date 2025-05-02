'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import apiClient from '@/app/lib/apiClient';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const FollowingTab = ({ userUniqueId, loggedInUserUniqueId }) => {
    const queryClient = useQueryClient();

    // Fetch following data using React Query
    const { data: following = [], isLoading, error } = useQuery({
        queryKey: ['following', userUniqueId],
        queryFn: async () => {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await apiClient.get(`/follow/getfollowing?userUniqueId=${userUniqueId}`, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            });
            return response.data;
        },
        enabled: !!userUniqueId, // Only fetch if userUniqueId is available
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });

    // Handle follow action
    const handleFollow = useCallback(
        async (followUser) => {
            const followUserUniqueId = followUser.uniqueId;
            const jwtToken = localStorage.getItem('jwtToken');
            try {
                await apiClient.post(
                    `/follow/addFollower`,
                    { followeeUniqueId: followUserUniqueId, followerUniqueId: loggedInUserUniqueId },
                    { headers: { Authorization: `Bearer ${jwtToken}` } }
                );

                // Update the cache
                queryClient.setQueryData(['following', userUniqueId], (oldData) =>
                    oldData.map((user) =>
                        user.uniqueId === followUserUniqueId
                            ? { ...user, followedByLoggedInUser: true }
                            : user
                    )
                );

                queryClient.setQueryData(['following', loggedInUserUniqueId], (oldData) => {
                    return [...(oldData || []), followUser];
                });


            } catch (err) {
                console.error(err);
            }
        },
        [loggedInUserUniqueId, queryClient, userUniqueId]
    );

    // Handle unfollow action
    const handleUnFollow = useCallback(
        async (followUserUniqueId) => {
            const jwtToken = localStorage.getItem('jwtToken');
            try {
                await apiClient.get(`/follow/unFollow?userUniqueId=${followUserUniqueId}`, {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                });

                // Update the cache
                queryClient.setQueryData(['following', userUniqueId], (oldData) =>
                    oldData.filter((user) => user.uniqueId !== followUserUniqueId)
                );

                

            } catch (err) {
                console.error(err);
            }
        },
        [queryClient, userUniqueId]
    );

    // Handle loading and error states
    if (isLoading) return <Typography>Loading following...</Typography>;
    if (error) return <Typography color="error">Failed to load following. Please try again later.</Typography>;

    return (
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

                                            <Box
                                                component={Link}
                                                sx={{ color: '#333333', cursor: 'pointer', textDecoration: 'none' }}
                                                href={`/profile/${user.uniqueId}`}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        '&:hover': {
                                                            textDecoration: 'underline',
                                                        },
                                                    }}
                                                >
                                                    {user.username ? user.username : user.name}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {userUniqueId === loggedInUserUniqueId && (
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleUnFollow(user.uniqueId)}
                                                disabled={!following.some((u) => u.uniqueId === user.uniqueId)}
                                            >
                                                Unfollow
                                            </Button>
                                        )}
                                        {userUniqueId !== loggedInUserUniqueId && (
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleFollow(user)}
                                                disabled={user.followedByLoggedInUser}
                                            >
                                                {user.followedByLoggedInUser ? 'Following' : 'Follow'}
                                            </Button>
                                        )}
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
    );
};

FollowingTab.propTypes = {
    userUniqueId: PropTypes.string.isRequired,
    loggedInUserUniqueId: PropTypes.string.isRequired,
};

export default FollowingTab;