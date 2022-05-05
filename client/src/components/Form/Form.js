import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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

    const history = useHistory();

    //Getting user from cache
    const user = JSON.parse(localStorage.getItem("profile"));

    //Getting the specific post from the store
    const post = useSelector((state) =>
        currentId ? state.posts.posts.find((p) => p._id === currentId) : null
    );

    //Setting useState/postData according to the mongoose schema
    const [postData, setPostData] = useState({
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
            dispatch(
                updatePost(currentId, { ...postData, name: user?.result?.name })
            );
        } else {
            //Sending data
            dispatch(
                createPost({ ...postData, name: user?.result?.name }, history)
            );
        }
        clear();
    };
    const clear = (e) => {
        setCurrentId(null);
        setPostData({
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own stories and like other
                    stories.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}>
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
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) =>
                        setPostData({ ...postData, title: e.target.value })
                    }
                />
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
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags (pretty,cute,small,...)"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            tags: e.target.value.split(","),
                        })
                    }
                />
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
