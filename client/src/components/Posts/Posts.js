import React from "react";

//Adding material components
import { Grid, CircularProgress, Typography, Box } from "@material-ui/core";

//To access redux store we use use selector
import { useSelector } from "react-redux";

//Importing custom components
import Post from "./Post/Post.js";

//Adding styles
import useStyles from "./styles.js";

const Posts = ({ setCurrentId }) => {
    const classes = useStyles();

    //useSelector takes a callback function and pass it the whole store/state
    //if you go to reducers index.js you can see that we have already specify posts
    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!posts.length && !isLoading)
        return (
            <Box display="flex" justifyContent="center">
                <Typography variant="h3" color="textSecondary">
                    No Posts
                </Typography>
            </Box>
        );

    return isLoading ? (
        <CircularProgress className={classes.progressBar} />
    ) : (
        <Grid
            className={classes.container}
            container
            alignItems="stretch"
            spacing={3}
        >
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
