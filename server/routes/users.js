//File that has everything to do with post
import express from "express";

//Importing handlers
//As we didn't used default we can use { some }
import { signIn, signUp } from "../controllers/users.js";

//Initializing my router
const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;
