//File that has everything to do with post
import express from "express";

//Importing handlers
//As we didn't used default we can use { some }
import {
    getPosts,
    getPostsBySearch,
    createPost,
    updatePost,
    deletePost,
    likePost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

//Initializing my router
const router = express.Router();

//Adding routes to router
//The callback function will be executed when someone visits "/" at PORT 5000
//Each callback function will have request and response
router.get("/", getPosts);
router.get("/search", getPostsBySearch);
//As the auth is before our action any changes made to its req and res will also be passed down to the req and res of action
router.post("/", auth, createPost);
//Patch is used for updating
// here : represent dynamic (changeable)
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
//Liking something is updating it
router.patch("/:id/likePost", auth, likePost);

export default router;
