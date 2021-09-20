import React, { useState } from "react";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
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
      <form className={classes.root}>
        <Typography  variant="h4" style={{fontWeight:"500"}} >Register</Typography>
        <TextField
          label="Fisrt Name"
          variant="outlined"
          type="text"
          required
          value={firstName}
          onChange={(e) => {
            setfirstName(e.target.value);
          }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          type="text"
          required
          value={lastName}
          onChange={(e) => {
            setlastName(e.target.value);
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
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
  );
}

export default Register;
