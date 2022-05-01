//File that has everything to do with post
import express from "express";

//Importing handlers
//As we didn't used default we can use { some }
import { getPosts, createPost } from "../controllers/posts.js";

//Initializing my router
const router = express.Router();

//Adding routes to router
//The callback function will be executed when someone visits "/" at PORT 5000
//Each callback function will have request and response
router.get("/", getPosts);
router.get("/", createPost);

export default router;
