import axios from "axios";

//URL pointing to our backend route
//This url returns all the posts that we have
const url = "http://localhost:5000/posts";

//Function connecting server with client using axios
export const fetchPosts = () => axios.get(url);
//Need both url and the data we are sending
//The connector was used in action file
export const createPost = (newPost) => axios.post(url, newPost);

//
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
