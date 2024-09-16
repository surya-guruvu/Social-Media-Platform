'use Client'

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField , DialogActions, Button} from "@mui/material";
import axios from "axios";

const PostDialogue = ({open, onClose, userUniqueId, setSnackBarSeverity, setSnackBarMessage, setSnackBarOpen})=>{
    const [text,setText] = useState('');

    const handlePost = ()=>{
        const jwtToken = localStorage.getItem('jwtToken');
        
        axios.post(`http://localhost:8080/posts/userUniqueId?userUniqueId=${userUniqueId}`,{text},
            {
                headers: { 'Authorization': `Bearer ${jwtToken}` }
            }
        )
        .then((res)=>{
            console.log(res);
            setText('');
            setSnackBarOpen(true);
            setSnackBarMessage("Post added successfully");
            setSnackBarSeverity('success');
            onClose();
        })
        .catch((err)=>{
            setSnackBarOpen(true);
            setSnackBarMessage("Post not added, Internal Server Error");
            setSnackBarSeverity('error');
            console.log(err);
        })
    }

    const handleClose = ()=>{
        setText('');
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Add Post</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="text"
                label="What's on your mind?"
                type="text"
                fullWidth
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                multiline
                rows={6}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>

                {text?
                <Button onClick={handlePost} color="primary">
                    Post
                </Button>
                :
                <Button color="primary" disabled>
                    Post
                </Button>
                }
            </DialogActions>

        </Dialog>

    );

}



export default PostDialogue;