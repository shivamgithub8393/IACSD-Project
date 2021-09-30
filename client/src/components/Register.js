import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import AuthService from "../services/auth.service";

const theme = createTheme();

function Register() {
  // const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // validate user is in session storage or not (validate user)
  const validate = function () {
    if (password.length >= 4 && password.length <= 16) {
      return true;
    } else {
      setMessage("Password length is in 4-16");
      return false;
    }
  };

  const validatePassword = function () {
  if (password !== confirmPassword) {
    setMessage("password and confirm password must be same");
    return false;
  } else{
    return true;
  }
}
  function validateNull() {
    if (
      firstName === "" &&
      lastName === "" &&
      userEmail === "" &&
      role === ""
    ) {
      setMessage("All fields Required!");
      return false;
    } else {
      return true;  
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // clear form
    setFirstName("");
    setLastName("");
    setUserEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole([]);
    setMessage("");
    setMessageType("success")

    if (validateNull() && validatePassword() && validate()) {
      setMessageType("success");
      console.log(firstName, lastName, userEmail, password, role);
      AuthService.register(firstName, lastName, userEmail, password, role).then(
        (response) => {
          setMessage(response.data.message);
          setMessageType("success");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(error.response);
          setMessage(resMessage);
          setMessageType("error");
        }
      );
    } else{
      setMessageType("error")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {message ? (
              <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
                <Alert severity={messageType}>{message}</Alert>
              </Stack>
            ) : (
              ""
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  autoComplete="lname"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={userEmail}
                  autoComplete="email"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  autoComplete="re-enter-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FormControl fullWidth sx={{ mt: 3 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Select Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={role}
                    label="Age"
                    onChange={(e) => setRole([e.target.value])}
                  >
                    <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                    <MenuItem value="ROLE_USER">User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
