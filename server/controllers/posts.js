//Inside it we are gonna control all the handlers/logic for our routes

//Import mongoose model
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

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    req.status(201).json(newPost);
  } catch (error) {
    req.status(409).json({ message: error.message });
  }
};
