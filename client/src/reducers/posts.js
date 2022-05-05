//Reducer is equal to a function that accept a state and action
//Than based on the type of the action it returns the changed state
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
//We always need to set an initial value for our state (posts)
export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload,
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload,
            };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            //The output of map is also an changed array
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };
        case DELETE:
            //Return all post which doesn't have the payload id
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
            };

        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };
        default:
            return state;
    }
};
