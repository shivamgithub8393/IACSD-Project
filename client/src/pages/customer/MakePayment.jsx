import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserService from "../../services/user.service";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function MakePayment({ data }) {
  // const history = useHistory();
  const [flight, setFlight] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");

  const getFlight = () => {
    const flightId = window.localStorage.getItem("flightId");
    UserService.getFlightById(flightId)
      .then((res) => {
        setFlight(res.data);
      })
      .catch((err) => {
        console.log("in err ", err.response.data);
        alert(err.response.data.message);
        // this.props.history.push("/flight");
      });
  };

  useEffect(() => {
    getFlight();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{fontWeight:"600"}}>
          Payment
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="Amount"
                name="Amout"
                required
                fullWidth
                value={data * flight.flightFare}
                label="Amount"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="Name"
                name="name"
                type="text"
                required
                fullWidth
                label="Card Holder Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="Card Number"
                name="cardNumber"
                type="text"
                required
                fullWidth
                label="Card Number"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="CVV"
                name="cvv"
                type="text"
                required
                fullWidth
                label="CVV"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="date"
                name="Expiry Date"
                type="text"
                required
                fullWidth
                label="Expiry Date: MM/YYYY"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default MakePayment;
