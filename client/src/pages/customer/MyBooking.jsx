import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import CustomerService from "../../services/customer.service";

export class MyBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      message: "",
     
    };
  }

  componentDidMount() {
    
    var userId = JSON.parse(localStorage.getItem("user")).id;
    CustomerService.getBooking(userId)
      .then((res) => {
        this.setState({
          data: res.data,
        });

        console.log(this.state.data);
      })
      .catch((err) => {
        console.log("in err ", err.response.data);
        this.setState({ message: err.response.data.message });
        // this.props.history.push("/flight");
      });
    console.log(this.state.data);
    console.log("djk");
  }

  handleClick = (id) => {
    console.log("clicked");
    const data = { "bookingId": id };
    console.log(data)
    CustomerService.cancelReservation(data)
      .then((res) => {
        console.log("cancelled");
        window.location.reload();
      })

  };
  render() {

    return (
      <>
        <Typography variant="h3" align="center" sx={{mt: 3}}>
          My Booking
        </Typography>
        {/* {this.state.message ? (
          <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
            <Alert severity="error">{this.state.message}</Alert>
          </Stack>
        ) : (
          ""
        )} */}
        {this.state.data.map((d) => (
          <Card sx={{ minWidth: "300px" }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                <strong>FROM : {d.flight.departureAirport.city} </strong>
                <br />
                <strong>To : {d.flight.arrivalAirport.city} </strong>
                {d.passenger.map((p, index) => (
                  <>
                    <Typography variant="h4" component="div">
                      Passenger {index + 1}:
                    </Typography>
                    <Typography variant="h5" component="div">
                      Name : {p.firstName} {p.lastName}{" "}
                    </Typography>
                    <Typography variant="h5" component="div">
                      Age : {p.age}{" "}
                    </Typography>
                    <Typography variant="h5" component="div">
                      Email : {p.email}{" "}
                    </Typography>
                  </>
                ))}
                {d.bookingStatus === "SUCCESS" && (
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "600", color: "green" }}
                  >
                    Booking Status : {d.bookingStatus}
                  </Typography>
                )}
                {d.bookingStatus === "CANCELLED" && (
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "600", color: "red" }}
                  >
                    Booking Status : {d.bookingStatus}
                  </Typography>
                )}
              </Typography>
              {d.bookingStatus === "SUCCESS" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.handleClick(d.id)}
                >
                  Cancel
                </Button>
              )}
              {d.bookingStatus === "CANCELLED" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.handleClick(d.id)}
                  disabled
                >
                  Cancel
                </Button>
              )}
            </CardContent>
            <hr style={{color:"black"}} />
          </Card>
        ))}
      </>
    );
  }
}

export default MyBooking;
