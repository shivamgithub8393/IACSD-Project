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
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import MakePayment from "./MakePayment";
import CustomerService from "../../services/customer.service";
import {useHistory} from "react-router-dom"

var data = [];
function AddPassenger() {
  const history = useHistory();
  // const [data, setData] = useState([])
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [governmentIdType, setGovernmentIdType] = useState("");
  const [governmentIdNumber, setGovernmentIdNumber] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [totalPassenger, setTotalPassenger] = useState(0);
  const [toggle, setToogle] = useState(false);

  const handleBooking = () => {
    const flightId = window.localStorage.getItem("flightId");
    const userId = JSON.parse(localStorage.getItem("user")).id;
    console.log(data);
    console.log(JSON.stringify(data));
    const bookingData = { passenger: data, flightId: flightId, userId: userId };
    console.log(bookingData);

    CustomerService.bookFlight(bookingData)
      .then((res) => {
        setMessage("Booking Successful!!");
        console.log(res.data);
        history.push("/customer/booking_success");
      },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            setMessage(resMessage)
            setMessageType("error")
        })
      
  };
  const validateNull =() =>{
    if(
      firstName === "" &&
      lastName === "" &&
      email === "" &&
      age === "" &&
      contactNumber === "" &&
      gender === "" &&
      address === "" &&
      governmentIdType === "" &&
      governmentIdNumber === "" 
    ){
      setMessage("All flieds Required!")
            setMessageType("error")
            return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // clear form
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge("");
    setContactNumber("");
    setGender("");
    setGovernmentIdType("");
    setGovernmentIdNumber("");
    setAddress("");
    setMessage("");

    if(validateNull()){
    const flightId = window.localStorage.getItem("flightId");
    const userId = JSON.parse(localStorage.getItem("user")).id;
    var passenger = {
      firstName,
      lastName,
      email,
      age,
      contactNumber,
      gender,
      governmentIdType,
      governmentIdNumber,
      address,
      flight: { id: flightId },
      user: { id: userId },
    };

    console.log(passenger);
    data = [...data, passenger];
    setTotalPassenger(data.length);
  }else{
    
  }


  };
  useEffect(() => {
    data = [];
  }, []);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            sx={{ fontWeight: "600" }}
            color="red"
            variant="h5"
          >
            Add Passenger
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {message && (
              <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
                <Alert severity={messageType}>{message}</Alert>
              </Stack>
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
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contactNumber"
                  label="contactNumber"
                  type="number"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                  }}
                />
                {contactNumber.length>10 ? (
                  <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
                    <Alert severity="error">Contact Number must be of 10 digits</Alert>
                  </Stack>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Select Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={gender}
                    label="Select Gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="MALE">MALE</MenuItem>
                    <MenuItem value="FEMALE">FEMALE</MenuItem>
                    <MenuItem value="TRANSGENDER">TRANSGENDER</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Select Government Id Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Id Type"
                    value={governmentIdType}
                    onChange={(e) => setGovernmentIdType(e.target.value)}
                  >
                    <MenuItem value="AADHAAR">AADHAAR</MenuItem>
                    <MenuItem value="PASSPORT">PASSPORT</MenuItem>
                    <MenuItem value="PAN">PAN</MenuItem>
                    <MenuItem value="DRIVING_LICENSE">DRIVING LICENSE</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Government Id Number"
                  label="governmentIdNumber"
                  type="text"
                  value={governmentIdNumber}
                  onChange={(e) => setGovernmentIdNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Address"
                  label="Address"
                  type="text"
                  multiline
                  rows={3}
                  columns={4}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Passenger
            </Button>
            Total Passengers : {totalPassenger}
          </Box>
          <Button
            color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => setToogle(!toggle)}
          >
            Go To Payment
          </Button>
        </Box>
      </Container>

      {toggle && (
        <Container component="main" maxWidth="xs">
          <MakePayment data={totalPassenger} />
          <Button
            color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleBooking()}
          >
            Book
          </Button>
        </Container>
      )}
      <div style={{ marginBottom: "100px" }}></div>
    </React.Fragment>
  );
}

export default AddPassenger;
