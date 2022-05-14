import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//Importing material components
import { Container } from "@material-ui/core";

//Importing custom components
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import PostDetails from "./components/PostDetails/PostDetails.js";

const App = () => {
    const user = () => JSON.parse(localStorage.getItem("profile"));

    return (
        //Container to center everything
        //Typography in material stand for any textual element but it gives us a nice looking font
        //Grow provides some simple animations
        //Grid contains a container and its item
        //Each item has 12 columns which can be specified for different devices
        //xs is very small and sm is small devices

        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    <Route
                        path="/"
                        exact
                        component={() => <Redirect to="/posts" />}
                    />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route
                        path="/auth"
                        exact
                        component={() =>
                            !user() ? <Auth /> : <Redirect to="/posts" />
                        }
                    />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;
