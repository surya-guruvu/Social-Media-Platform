'use Client'

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
import axios from 'axios';
import { useEffect, useState} from 'react';


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

export default function PostCard({name,content,date,actId, id, currentUserUniqueId}) {
  const [expanded, setExpanded] = useState(false);
  const [isFavorited,setIsFavorited] = useState(false);
  const [likes,setLikes] = useState(0);

  const activityType = "post"; 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    axios.post("http://localhost:8080/likeRequest",
      { "parentId":id,"userUniqueId":currentUserUniqueId,"type":activityType},
      { headers: { 'Authorization': `Bearer ${jwtToken}`,'Content-Type': 'application/json' } }
    )
    .then((res)=>{
      if(isFavorited){
        setLikes(likes-1);
        setIsFavorited(false);
      }
      else{
        setLikes(likes+1);
        setIsFavorited(true);
      }
    })
    .catch((err)=>{
      console.log(err);
    });


    
  };


  useEffect(()=>{
    const jwtToken = localStorage.getItem('jwtToken');

    axios.get(`http://localhost:8080/likeRequest?activityId=${actId}`,{
      headers: { Authorization: `Bearer ${jwtToken}` }
    })
    .then((res)=>{
      setLikes(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  });

  useEffect(()=>{
    const jwtToken = localStorage.getItem('jwtToken');
    axios.get(`http://localhost:8080/checkUserLiked?parentId=${id}&userUniqueId=${currentUserUniqueId}`,{
      headers: { Authorization: `Bearer ${jwtToken}` }
    })
    .then((res)=>{
      setIsFavorited(res.data);
    })
    .catch((err)=>{
      console.log(err);
    });
  })


  return (
    <Card maxwidth="md" elevation={3} sx={{marginBottom: '2rem'}}>
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
            <Typography sx={{ marginBottom: 2 }}>Collapse Content</Typography>
            </CardContent>
        </Collapse>
        
    </Card>
  );
}