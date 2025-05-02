import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import apiClient from '@/app/lib/apiClient';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const FollowersTab = ({ userUniqueId, loggedInUserUniqueId }) => {
    const queryClient = useQueryClient(); 

    const { data: followers = [], isLoading, error } = useQuery({
        queryKey: ['followers', userUniqueId],
        queryFn: async () => {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await apiClient.get(`/follow/getfollowers?userUniqueId=${userUniqueId}`, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            });
            return response.data;
        },
        enabled: !!userUniqueId,
        staleTime: 5 * 60 * 1000,
    });

    const handleFollow = useCallback(async (followUser) => {
        const followUserUniqueId = followUser.uniqueId;
        const jwtToken = localStorage.getItem('jwtToken');
        try {
            await apiClient.post(
                `/follow/addFollower`,
                { followeeUniqueId: followUserUniqueId, followerUniqueId: loggedInUserUniqueId },
                { headers: { Authorization: `Bearer ${jwtToken}` } }
            );

            queryClient.setQueryData(['followers', userUniqueId], (oldData) =>
                oldData.map((follower) =>
                    follower.uniqueId === followUserUniqueId
                        ? { ...follower, followedByLoggedInUser: true }
                        : follower
                )
            );

            queryClient.setQueryData(['following', loggedInUserUniqueId], (oldData) => {
                return [...(oldData || []), followUser];
            });
        } catch (err) {
            console.error(err);
        }
    }, [loggedInUserUniqueId, queryClient, userUniqueId]);
        

    const handleRemoveFollow = useCallback(async (followUserUniqueId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        try {
            await apiClient.get(`/follow/removeFollower?userUniqueId=${followUserUniqueId}`, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            });

            queryClient.setQueryData(['followers', userUniqueId], (oldData) =>
                oldData.filter((follower) => follower.uniqueId !== followUserUniqueId)
            );
        } catch (err) {
            console.error(err);
        }
    }, [queryClient, userUniqueId]);

    if (isLoading) return <Typography>Loading followers...</Typography>;
    if (error) return <Typography color="error">Failed to load followers. Please try again later.</Typography>;

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Followers
            </Typography>

            {followers.length > 0 ? (
                <Grid container spacing={3}>
                    {followers.map((user) => (
                        <Grid item xs={12} sm={6} md={6} key={user.uniqueId}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box display="flex" alignItems="center">
                                            <Avatar
                                                alt={user.username}
                                                src={user.profileImageUrl}
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
                                                    {user.username || user.name}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {userUniqueId === loggedInUserUniqueId ? (
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleRemoveFollow(user.uniqueId)}
                                            >
                                                Remove
                                            </Button>
                                        ) : (
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
                <Typography>No followers found</Typography>
            )}
        </>
    );
};

FollowersTab.propTypes = {
    userUniqueId: PropTypes.string.isRequired,
    loggedInUserUniqueId: PropTypes.string.isRequired,
};

export default FollowersTab;