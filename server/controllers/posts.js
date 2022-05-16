//Inside it we are gonna control all the handlers/logic for our routes

//Import mongoose model
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

function sanitizeString(str) {
    if (typeof str === "string") {
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
        return str.trim();
    } else return "Hacker error 12390911884355";
}

//We use async because we used await
export const getPosts = async (req, res) => {
    try {
        const { page } = req.query;

        const LIMIT = 12;
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
    try {
        const { id } = req.params;

        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    try {
        //params are used for links like /:id
        //query is used for links like /dsa?asd
        const LIMIT = 12;
        const searchQuery = sanitizeString(req.query.searchQuery).substring(
            0,
            30
        );
        let tags = sanitizeString(req.query.tags);

        //Whenever there are no tags mongodb returns all the posts
        //Therefore we assign a custom tag that returns no tags
        //There are other ways to deal with it but i like this approach
        //Because it is very simple to understand and it speaks for itself
        if (!tags) {
            tags = "The user have no tags in input";
        }

        //We converted into regularExp because it makes easier to search for mongodb
        //Here i just mean ignore punctuation meaning t=T and etc
        const title = new RegExp(searchQuery, "i");

        //$or means any one of them title or tags
        //$in means having any of these tags that i passed as an array
        const posts = await PostMessage.find({
            $or: [
                { title },
                { tags: { $in: new RegExp(tags.split(","), "i") } },
            ],
        }).limit(LIMIT);

        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//With post-request we have access to request.body
export const createPost = async (req, res) => {
    try {
        const post = req.body;

        const newPostMessage = new PostMessage({
            ...post,
            creator: req.userId,
            createdAt: new Date().toISOString(),
        });

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

    try {
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
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send("No post with Id");

        await PostMessage.findByIdAndRemove(id);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const likePost = async (req, res) => {
    try {
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

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const postComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;

        const post = await PostMessage.findById(id);

        post.comments.push(value);

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
            new: true,
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
