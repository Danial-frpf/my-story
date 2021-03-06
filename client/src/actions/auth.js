import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

//Whenever we use async with an action we have to use redux thunk with it
export const signIn = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        history.push("/");
    } catch (error) {
        alert("Wrong email or password");
    }
};

export const signUp = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        history.push("/");
    } catch (error) {
        alert("User already exists. Try a different user name");
    }
};
