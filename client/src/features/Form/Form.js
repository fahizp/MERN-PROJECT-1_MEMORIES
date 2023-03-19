import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";

import { createPost , fetchPosts } from "../posts/postsSlice";

import useStyles from './styles'


const From = () => {
  const dispatch =  useDispatch();
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const classes = useStyles();
  
  
  const canSave = postData !== { creator: '', title: '', message: '', tags: '', selectedFile: '' } && addRequestStatus === 'idle';

  const clear = () => {
    
  };
  
  const handleSubmit = async (e) => {
    
    
    if (canSave) {
      try {
         e.preventDefault();
          setAddRequestStatus('pending')
          dispatch(createPost(postData)).then(() => {
            dispatch(fetchPosts());
          });
          setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' })

      } catch (err) {
          console.error('Failed to save the post', err)
      } finally {
          setAddRequestStatus('idle')
      }
  }
      
    };

  
    return (
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">Creating a Memory</Typography>
          <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} disabled={!canSave} variant="contained"  color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    );
}

export default From;


