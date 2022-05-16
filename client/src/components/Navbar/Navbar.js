import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

//Adding material ui components
import {
    AppBar,
    Avatar,
    Button,
    Toolbar,
    Typography,
    Grid,
} from "@material-ui/core";

//Jwt
import decode from "jwt-decode";

//Adding styles
import useStyles from "./styles.js";

//Importing image
import memories from "../../images/memories.png";

const Navbar = () => {
    const classes = useStyles();
    //user State
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );

    const token = user?.token;

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = useCallback(() => {
        dispatch({ type: "LOGOUT" });
        history.push("/");
        setUser(null);
    }, [dispatch, history]);

    useEffect(() => {
        // For manual sign up you need to verify that token
        // For google you don't need to
        //Code to logout the user when the token gets expired
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location, token, logout]);
    return (
        <AppBar className={`grad--purple ${classes.appBar}`} position="static">
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={0}
            >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className={classes.title}>
                        <Typography
                            className={classes.heading}
                            component={Link}
                            to="/"
                            variant="h2"
                            align="center"
                        >
                            My Story
                        </Typography>
                        <img
                            className={classes.image}
                            src={memories}
                            alt="My Story"
                            height="60"
                        />
                    </div>
                </Grid>

                {user ? (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Toolbar className={classes.toolbar}>
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.purple}
                                    alt={user.result.name}
                                    src={user.result.imageUrl}
                                >
                                    {user.result.name.charAt(0)}
                                </Avatar>
                                <Typography
                                    className={classes.userName}
                                    variant="h6"
                                >
                                    {user.result.name.substring(0, 30)}
                                </Typography>
                            </div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </Toolbar>
                    </Grid>
                ) : (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Toolbar className={classes.toolbar}>
                            <Button
                                className={classes.signInButton}
                                component={Link}
                                to="/auth"
                                variant="contained"
                                color="primary"
                            >
                                Sign In / Sign Up
                            </Button>
                        </Toolbar>
                    </Grid>
                )}
            </Grid>
        </AppBar>
    );
};

export default Navbar;
