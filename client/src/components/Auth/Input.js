import React from "react";

//Material components
import { Grid, InputAdornment, TextField, IconButton } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({
    half,
    name,
    label,
    type,
    autoFocus,
    handleChange,
    handleShowPassword,
    value,
}) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            value={value}
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={
                name === "password"
                    ? {
                          endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton onClick={handleShowPassword}>
                                      {type === "password" ? (
                                          <Visibility />
                                      ) : (
                                          <VisibilityOff />
                                      )}
                                  </IconButton>
                              </InputAdornment>
                          ),
                      } //Input props need an object or null don't return boolean to it
                    : null
            }
        />
    </Grid>
);

export default Input;
