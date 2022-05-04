import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";

//combineReducer need key value pairs but in our case because both our key and value name is post
//We can just write posts instead of posts: posts
export default combineReducers({ posts, auth });
