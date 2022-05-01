import * as api from "../api";

//Action creators--Functions that returns actions
//Payload is extra data like where we store all of posts
//As we are working with async data therefore we need to redux thunk
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
