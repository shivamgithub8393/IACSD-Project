import React, { useState } from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "400px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

function Login() {
  const history = useHistory();
  const classes = useStyles();

  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");

  // validate user is in session storage or not (validate user)
  const validate = function () {
    let status = false;
    const userData = JSON.parse(sessionStorage.getItem("users"));
    console.log(userData);
    userData.forEach((user) => {
      if (user.email === userEmail && user.password === userPassword) {
        status = true;
      }
    });
    return status;
  };

  const handleClick = (event) => {
    event.preventDefault();
    // sue sessionStorage to validate the user
    if (validate()) {
      console.log("Valid !");
    } else {
      console.log("Invalid !");
    }
  };

  return (
    <div>
      <form className={classes.root}>
        <h1>Login</h1>
        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          value={userEmail}
          onChange={(e) => {
            setuserEmail(e.target.value);
          }}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          value={userPassword}
          onChange={(e) => {
            setuserPassword(e.target.value);
          }}
        />
        <div>
          <Button
            variant="contained"
            onClick={function () {
              history.push("/register");
            }}
          >
            Sign Up
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
