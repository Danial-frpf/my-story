import React, { useState, useEffect } from "react";

//Other react dependencies
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

//Importing material components
import { TextField, Button, Typography, Paper } from "@material-ui/core";

//Adding styles
import useStyles from "./styles.js";

//Custom actions
import { createPost, updatePost } from "../../actions/posts.js";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();

  //Getting the specific post from the store
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  //Setting useState/postData according to the mongoose schema
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  //useEffect checking for changes in post
  //Its updates the input fields
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  //This allows us to dispatch actions
  //Here we want to dispatch it on handle submit
  const dispatch = useDispatch();

  //Handler for form submit & clear
  const handleSubmit = (e) => {
    //Preventing refresh
    e.preventDefault();

    //If we have a an id than update
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      //Sending data
      dispatch(createPost(postData));
    }
    clear();
  };
  const clear = (e) => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Story
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        ></TextField>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        ></TextField>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            //We only need one
            multiple={false}
            //We also did destructuring here in the argument
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
