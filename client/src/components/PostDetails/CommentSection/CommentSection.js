import React, { useState, useRef } from "react";
import {
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { postComment } from "../../../actions/posts";

const CommentSection = ({ post }) => {
    const classes = useStyles();

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
            {user?.result?.name && (
                <div>
                    <Typography gutterBottom variant="h5" color="primary">
                        Comments
                    </Typography>
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

            {comments.map((c, i) => (
                <Card style={{ marginTop: "1rem" }} raised key={i}>
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
            ))}
            <div ref={commentsRef}></div>
        </div>
    );
};

export default CommentSection;
