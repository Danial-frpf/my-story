import React, { useEffect, useState } from "react";

//Adding material components
import { Container, Grow, Grid } from "@material-ui/core";

//Importing hook from redux
import { useDispatch } from "react-redux";

//Custom components
import { getPosts } from "../../actions/posts.js";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

//Adding styles
import useStyles from "./styles.js";

const Home = () => {
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
  );
};

export default Home;
