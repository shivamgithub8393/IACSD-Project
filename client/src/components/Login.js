import React, { useState } from "react";
import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
      // width: 200,
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
    <Container style={{ marginTop: "2rem" }} maxWidth="sm">
      <form action="#" method="POST" autoComplete="off">
        <TextField name="userEmail" label="Email" variant="outlined" />
        <TextField
          name="userPassword"
          label="Password"
          type="password"
          variant="outlined"
        />
      </form>
    </Container>
  );
}

export default Login;
