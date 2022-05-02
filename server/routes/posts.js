//File that has everything to do with post
import express from "express";

//Importing handlers
//As we didn't used default we can use { some }
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

//Initializing my router
const router = express.Router();

//Adding routes to router
//The callback function will be executed when someone visits "/" at PORT 5000
//Each callback function will have request and response
router.get("/", getPosts);
router.post("/", createPost);
//Patch is used for updating
// here : represent dynamic (changeable)
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
//Liking something is updating it
router.patch("/:id/likePost", likePost);

export default router;
