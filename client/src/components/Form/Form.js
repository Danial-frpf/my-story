import React, { useState } from "react";

//Importing material components
import { TextField, Button, Typography, Paper } from "@material-ui/core";

//Adding styles
import useStyles from "./styles.js";

const Form = () => {
  const classes = useStyles();

  //Setting useState/postData according to the mongoose schema
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    lags: "",
    selectedFile: "",
  });

  //Handler for form submit
  const handleSubmit = () => {};

  return (
    <Paper className={classes.paper}>
      <form
        className={classes.form}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Story</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        ></TextField>
      </form>
    </Paper>
  );
};

export default Form;
