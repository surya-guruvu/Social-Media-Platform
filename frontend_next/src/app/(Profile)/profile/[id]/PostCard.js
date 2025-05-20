'use client';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { use, useEffect, useState } from 'react';
import apiClient from '@/app/lib/apiClient';
import { create } from '@mui/material/styles/createTransitions';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function PostCard({ name, content, date, actId, id, currentUserUniqueId }) {
  const [expanded, setExpanded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likes, setLikes] = useState(0);

  // Comments state
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  const activityType = "post";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    apiClient.post("likeRequest",
      { "parentId": id, "userUniqueId": currentUserUniqueId, "type": activityType },
      { headers: { 'Authorization': `Bearer ${jwtToken}`, 'Content-Type': 'application/json' } }
    )
      .then((res) => {
        if (isFavorited) {
          setLikes(likes - 1);
          setIsFavorited(false);
        }
        else {
          setLikes(likes + 1);
          setIsFavorited(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch likes count
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    apiClient.get(`/likeRequest?activityId=${actId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` }
    })
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [actId]);

  // Fetch if user has liked
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    apiClient.get(`/checkUserLiked?parentId=${id}&userUniqueId=${currentUserUniqueId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` }
    })
      .then((res) => {
        setIsFavorited(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, currentUserUniqueId]);

  // Fetch top-level comments when expanded
  useEffect(() => {
    if (expanded) {
      const jwtToken = localStorage.getItem('jwtToken');
      apiClient.get(`/comments/post/?postId=${id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      })
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [expanded, id]);

  // Handle comment submit
  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    setCommentLoading(true);
    const jwtToken = localStorage.getItem('jwtToken');
    apiClient.post('/comments/addComment/', {
      content: commentInput,
      postId: id,
      parentCommentId: null,
      userUniqueId: currentUserUniqueId,
      createdAt: new Date().toISOString(),
    }, {
      headers: { Authorization: `Bearer ${jwtToken}` }
    })
      .then((res) => {
        setComments((prev) => [res.data, ...prev]);
        setCommentInput('');
      })
      .catch((err) => console.log(err))
      .finally(() => setCommentLoading(false));
  };

  return (
    <Card maxwidth="md" elevation={3} sx={{ marginBottom: '2rem' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user-avatar">
            U
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={date}
      />

      <CardMedia
        component="img"
        height="194"
        image="/tempAvatar.jpg"
        alt="Paella dish"
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {content}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick} size='small'>
          {isFavorited ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>

        <Typography variant="body" display="inline" sx={{ ml: -0.7 }}>
          {likes}
        </Typography>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Comments</Typography>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <TextField
              size="small"
              fullWidth
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              disabled={commentLoading}
            />
            <IconButton
              color="primary"
              onClick={handleCommentSubmit}
              disabled={commentLoading || !commentInput.trim()}
              aria-label="send comment"
            >
              <SendIcon />
            </IconButton>
          </Box>
          {comments.length === 0 ? (
            <Typography color="text.secondary">No comments yet.</Typography>
          ) : (
            comments.map((comment) => (
              <Box key={comment.id} mb={1.5} p={1} borderRadius={1} bgcolor="#f5f5f5">
                <Typography variant="subtitle2">{comment.username}</Typography>
                <Typography variant="body2" color="text.secondary">{comment.content}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(comment.timeStamp).toLocaleString()}
                </Typography>
                {comment.replyCount > 0 && (
                  <Button size="small" sx={{ mt: 0.5 }}>
                    Show {comment.replyCount} {comment.replyCount === 1 ? 'reply' : 'replies'}
                  </Button>
                )}
              </Box>
            ))
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}