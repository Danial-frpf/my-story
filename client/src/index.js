import React from "react";
import ReactDom from "react-dom";

import App from "./App";

//Implementing redux
//Provider keeps track of the store and allow us to access it from anywhere
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

//Initializing store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
