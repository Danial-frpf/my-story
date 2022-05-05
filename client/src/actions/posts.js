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
} from "../constants/actionTypes";

//Action creators--Functions that returns actions
//Payload is extra data like where we store all of posts
//As we are working with async data therefore we need to redux thunk

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        dispatch({ type: END_LOADING });

        dispatch({ type: FETCH_POST, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({ type: END_LOADING });

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        //We have to destructure the data two times first because of axios and second time because we put it into a new object
        const {
            data: { data },
        } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: END_LOADING });

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
    } catch (error) {
        console.log(error);
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
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        //We are not interested in the returned data
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
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
