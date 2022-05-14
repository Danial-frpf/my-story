import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import moment from "moment";

import {
    Divider,
    Paper,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardActionArea,
    CardContent,
} from "@material-ui/core";

import useStyles from "./styles.js";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection/CommentSection.js";

const PostDetails = () => {
    const classes = useStyles();
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    useLayoutEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);

    useLayoutEffect(() => {
        if (post) {
            dispatch(
                getPostsBySearch({ search: "none", tags: post.tags.join(",") })
            );
        }
    }, [dispatch, post]);

    if (!post) return null;

    if (isLoading) {
        return (
            <Paper className={classes.loadingPaper} elevation={6}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

    const openPost = (_id) => history.push(`/posts/${_id}`);

    return (
        <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className={classes.section}>
                        <div>
                            <Typography variant="h3" component="h2">
                                {post.title}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                color="textSecondary"
                                component="h2"
                            >
                                {post.tags.map((tag) => `#${tag} `)}
                            </Typography>
                            <Divider style={{ margin: "20px 0" }} />
                        </div>
                        <div style={{ height: "100%" }}>
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="p"
                            >
                                {post.message}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6">
                                Created by: {post.name}
                            </Typography>
                            <Typography variant="body1">
                                {moment(post.createdAt).fromNow()}
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            width: "100%",
                        }}
                    >
                        <img
                            className={classes.media}
                            src={
                                post.selectedFile ||
                                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                            }
                            alt={post.title}
                        />
                    </div>
                </Grid>
            </Grid>
            <Divider style={{ margin: "20px 0" }} />
            {/* Recommended post logic */}
            {0 < recommendedPosts.length && (
                <div>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" color="primary">
                                You might also like:
                            </Typography>
                        </CardContent>
                    </Card>

                    <Divider style={{ margin: "20px 0" }} />

                    <Grid container spacing={1}>
                        {recommendedPosts.map(
                            ({
                                title,
                                tags,
                                name,
                                likes,
                                selectedFile,
                                _id,
                            }) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={3}
                                    lg={3}
                                    xl={3}
                                    key={_id}
                                >
                                    <Card raised elevation={6}>
                                        <CardActionArea
                                            onClick={() => openPost(_id)}
                                        >
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                >
                                                    {title}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                >
                                                    {name}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="subtitle2"
                                                    color="textSecondary"
                                                >
                                                    {post.tags.map(
                                                        (tag) => `#${tag} `
                                                    )}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="subtitle2"
                                                    color="primary"
                                                >
                                                    Likes: {likes.length}
                                                </Typography>
                                                <img
                                                    src={selectedFile}
                                                    style={{
                                                        objectFit: "cover",
                                                        height: "25vh",
                                                    }}
                                                    width="100%"
                                                    alt="Recommendation images"
                                                />
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        )}
                    </Grid>
                </div>
            )}
            <Divider style={{ margin: "20px 0" }} />
            <CommentSection post={post} />
        </Paper>
    );
};

export default PostDetails;
