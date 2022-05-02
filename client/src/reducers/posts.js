//Reducer is equal to a function that accept a state and action
//Than based on the type of the action it returns the changed state

//We always need to set an initial value for our state (posts)
export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    default:
      return posts;
  }
};
