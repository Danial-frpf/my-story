import axios from "axios";

//Creating axios instance
//It will provide us some more functions
const API = axios.create({ baseURL: "http://localhost:5000" });

//This will happen before on each one of our request
//It needs a call back function
//We need it to send the token to our backend for auth
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        //We need to add Bearer before sending the token
        req.headers.authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }

    //Yes it will add the above in all our requests
    return req;
});

//URL pointing to our backend route
//This url returns all the posts that we have
//Before example
//const url = "http://localhost:5000/posts";
//export const fetchPosts = () => axios.get(url);

//Function connecting server with client using axios
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

//For searches
export const fetchPostsBySearch = (searchQuery) =>
    API.get(
        `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
            searchQuery.tags
        }`
    );
//Need both url and the data we are sending
//The connector was used in action file
export const createPost = (newPost) => API.post("/posts", newPost);

//
export const updatePost = (id, updatedPost) =>
    API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const postComment = (value, id) =>
    API.post(`/posts/${id}/postComment`, { value });

//Auth calls
export const signIn = (formData) => API.post("/user/signIn", formData);
export const signUp = (formData) => API.post("/user/signUp", formData);
