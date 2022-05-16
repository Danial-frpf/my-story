import React, { useState, useRef } from "react";
import {
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Box,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { postComment } from "../../../actions/posts";

const CommentSection = ({ post }) => {
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("profile"));

    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");

    const commentsRef = useRef();

    const handleClick = async () => {
        setComment("");
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(postComment(finalComment, post._id));
        setComments(newComments);
        commentsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <Typography gutterBottom variant="h5" color="primary">
                Comments
            </Typography>
            {user?.result?.name && (
                <div>
                    <TextField
                        fullWidth
                        maxRows={4}
                        variant="outlined"
                        label="Write a comment"
                        multiline
                        inputProps={{ maxLength: 500 }}
                        value={comment}
                        onKeyPress={(e) => {
                            if (
                                e.key === "Enter" &&
                                !e.shiftKey &&
                                comment.trim()
                            )
                                handleClick();
                        }}
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                    />
                    <Button
                        style={{ marginTop: "10px" }}
                        fullWidth
                        disabled={!comment.trim()}
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        Comment
                    </Button>
                </div>
            )}

            {comments.length === 0 ? (
                <Box className="scaleAnimation">
                    <Card
                        className="scale-in-center"
                        style={{ marginTop: "1rem" }}
                        raised
                    >
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                color="primary"
                            >
                                <strong>No Comments</strong>
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            ) : (
                comments.map((c, i) => (
                    <Box className="scaleAnimation" key={i}>
                        <Card
                            className="scale-in-center"
                            style={{ marginTop: "1rem" }}
                            raised
                        >
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="subtitle1"
                                    color="primary"
                                >
                                    <strong>{c.split(": ")[0]}:</strong>
                                </Typography>
                                <Typography variant="subtitle1">
                                    {c.split(":")[1]}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))
            )}

            <div ref={commentsRef}></div>
        </div>
    );
};

export default CommentSection;
