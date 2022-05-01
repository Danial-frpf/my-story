import React from "react";

//To access reux store we use use selector
import { useSelector } from "react-redux";

//Importing custom components
import Post from "./Post/Post.js";

//Adding styles
import useStyles from "./styles.js";

const Posts = () => {
  const classes = useStyles();

  //useSelector takes a callback function and pass it the whole store/state
  //if you go to reducers index.js you can see that we have already specify posts
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  return (
    <>
      <h1>Posts</h1>
      <Post />
      <Post />
    </>
  );
};

export default Posts;
