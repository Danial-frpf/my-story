//Inside it we are gonna control all the handlers/logic for our routes

//Import mongoose model
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//We use async because we used await
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    console.log(postMessages);

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//With post-request we have access to request.body
export const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  //Because we specified it as id in url anything in its place will become id
  //We access that id from req.params and assign it to _id
  //id will be assigned to _id
  const { id: _id } = req.params;
  const post = req.body;

  //Checking whether the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with Id");

  //New = true return us the post
  //We use {...post, _id} instead of post so that it gets the same id back
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  //Send the updated post back to client
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with Id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with Id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //Adding user id
    post.likes.push(req.userId);
    //Like the post
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
    //Dislike
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
