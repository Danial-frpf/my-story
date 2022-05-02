import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Importing material components
import { Container } from "@material-ui/core";

//Importing custom components
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";

const App = () => {
  return (
    //Container to center everything
    //Typography in material stand for any textual element but it gives us a nice looking font
    //Grow provides some simple animations
    //Grid contains a container and its item
    //Each item has 12 columns which can be specified for different devices
    //xs is very small and sm is small devices

    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
