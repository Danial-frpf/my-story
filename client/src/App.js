import React, { useState, useEffect } from "react";

//Importing hook from redux
import { useDispatch } from "react-redux";

//Importing material components
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

//Importing custom components
import { getPosts } from "./actions/posts.js";
import Posts from "./components/Posts/Posts.js";
import Form from "./components/Form/Form.js";

//Adding styles
import useStyles from "./styles.js";

//Importing image
import memories from "./images/memories.png";

const App = () => {
  const classes = useStyles();

  //Initializing id state
  const [currentId, setCurrentId] = useState(null);

  //Defining dispatch
  const dispatch = useDispatch();

  //Here getPosts is the action
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    //Container to center everything
    //Typography in material stand for any textual element but it gives us a nice looking font
    //Grow provides some simple animations
    //Grid contains a container and its item
    //Each item has 12 columns which can be specified for different devices
    //xs is very small and sm is small devices

    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          My Story
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
