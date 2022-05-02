//Reducer is equal to a function that accept a state and action
//Than based on the type of the action it returns the changed state
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";
//We always need to set an initial value for our state (posts)
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      //The output of map is also an changed array
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      //Return all post which doesn't have the payload id
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
