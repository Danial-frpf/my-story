//Inside it we are gonna control all the handlers/logic for our routes

//Import mongoose model
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//We use async because we used await
export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; //Get the starting index of every page
        const total = await PostMessage.countDocuments({}); //To know how many posts we have

        //The id sort give us from newest to oldest
        const posts = await PostMessage.find()
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndex);

        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT),
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    //params are used for links like /:id
    //query is used for links like /dsa?asd
    const { searchQuery, tags } = req.query;
    try {
        //We converted into regularExp because it makes easier to search for mongodb
        //Here i just mean ignore punctuation meaning t=T and etc
        const title = new RegExp(searchQuery, "i");

        //$or means any one of them title or tags
        //$in means having any of these tags that i passed as an array
        const posts = await PostMessage.find({
            $or: [{ title }, { tags: { $in: tags.split(",") } }],
        });

        res.status(200).json({ data: posts });
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
