import React, { useState } from "react";

//Adding material components
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    CardActionArea,
    Box,
} from "@material-ui/core";

//Moment is a nice time display library
import moment from "moment";

import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { useHistory } from "react-router-dom";

//Adding styles
import useStyles from "./styles.js";

//Adding redux capabilities
import { useDispatch } from "react-redux";

//Adding actions
import { deletePost, likePost } from "../../../actions/posts.js";

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();

    //Getting user from cache
    const user = JSON.parse(localStorage.getItem("profile"));

    const dispatch = useDispatch();
    const history = useHistory();

    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const [likes, setLikes] = useState(post?.likes);

    const openPost = () => {
        history.push(`/posts/${post._id}`);
    };

    const handleLike = async () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    };

    //Sub component
    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId) ? (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;
                    {likes.length > 2
                        ? `You and ${likes.length - 1} others`
                        : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlinedIcon fontSize="small" />
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        }

        return (
            <>
                <ThumbUpAltOutlinedIcon fontSize="small" />
                &nbsp;Like
            </>
        );
    };

    return (
        <Box className="scaleAnimation" height="100%">
            <Card
                className={`scale-in-center ${classes.card}`}
                raised
                elevation={6}
            >
                <CardActionArea onClick={openPost}>
                    <CardMedia
                        className={classes.media}
                        image={
                            post.selectedFile ||
                            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                        }
                        title={post.title}
                    />
                    <div className={classes.overlay}>
                        <Typography variant="h6">
                            {post.name.substring(0, 30)}
                        </Typography>
                        <Typography variant="body2">
                            {moment(post.createdAt).fromNow()}
                        </Typography>
                    </div>
                    <div className={classes.details}>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="h2"
                        >
                            {post.tags.map((tag) => `#${tag} `)}
                        </Typography>
                    </div>
                    <Typography
                        className={classes.title}
                        variant="h5"
                        component="p"
                        gutterBottom
                    >
                        {post.title.substring(0, 30)}
                    </Typography>
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {post.message.length > 250
                                ? post.message.substring(0, 250) + "..."
                                : post.message}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Button
                        size="small"
                        color="primary"
                        disabled={!user?.result}
                        onClick={handleLike}
                    >
                        <Likes />
                    </Button>
                    {(user?.result?.googleId === post?.creator ||
                        user?.result?._id === post?.creator) && (
                        <div style={{ flexDirection: "row" }}>
                            <Button
                                color="primary"
                                size="small"
                                onClick={() => setCurrentId(post._id)}
                            >
                                <EditIcon fontSize="small" />
                                Edit
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() => dispatch(deletePost(post._id))}
                            >
                                <DeleteIcon fontSize="small" />
                                Delete
                            </Button>
                        </div>
                    )}
                </CardActions>
            </Card>
        </Box>
    );
};

export default Post;
