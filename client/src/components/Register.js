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

function Register() {
  const users = [];
  const history = useHistory();
  const classes = useStyles();

  // state var
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Handle click invoked");
    // // add user details into session storage after registration successfully done
    const newUser = { email: email, password: password };
    users.push(newUser);
    sessionStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <div>
      <form className={classes.root}>
        <h1>Register</h1>
        <TextField
          label="Fisrt Name"
          variant="filled"
          type="text"
          required
          value={firstName}
          onChange={(e) => {
            setfirstName(e.target.value);
          }}
        />
        <TextField
          label="Last Name"
          variant="filled"
          type="text"
          required
          value={lastName}
          onChange={(e) => {
            setlastName(e.target.value);
          }}
        />
        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />

        <div>
          <Button
            variant="contained"
            onClick={function () {
              history.push("/login");
            }}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
