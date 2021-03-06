import * as api from "../api";
import {
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE,
    FETCH_BY_SEARCH,
    START_LOADING,
    END_LOADING,
    FETCH_POST,
    COMMENT,
    START_LOADING_DETAILS,
    END_LOADING_DETAILS,
} from "../constants/actionTypes";

//Action creators--Functions that returns actions
//Payload is extra data like where we store all of posts
//As we are working with async data therefore we need to redux thunk

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_DETAILS });

        const { data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: data });

        dispatch({ type: END_LOADING_DETAILS });
    } catch (error) {
        alert("Was not able to get post. Please refresh the page");
    }
};

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        alert("Was not able to get posts. Please refresh the page");
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        //We have to destructure the data two times first because of axios and second time because we put it into a new object
        const {
            data: { data },
        } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        alert("Was not able to get search result. Please search again");
    }
};

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        //Destructuring data from the response
        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`);

        dispatch({ type: END_LOADING });

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        alert("Was not able to create post.Try again later");
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        alert("Was not able to update post.Try again later");
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        //We are not interested in the returned data
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        alert("Was not able to delete post.Try again later");
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const postComment = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.postComment(value, id);

        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
};
