import axios from "axios";

//URL pointing to our backend route
//This url returns all the posts that we have
const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
