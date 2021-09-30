import { Alert, Stack } from "@mui/material";
import React, { Component } from "react";
import AdminService from "../../../services/admin.service";

class AddFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightNo: "",
      airlineId: "",
      departureAirportId: "",
      arrivalAirportId: "",
      departureTime: "",
      arrivalTime: "",
      flightFare: "",
      totalSeats: "",
      message: null,
      airports: [],
      airlines:[],
    };

    this.addFight = this.addFlight.bind(this);
  }

  addFlight = (e) => {
    e.preventDefault();
    let flight = {
      flightNo: this.state.flightNo,
      airlineId: this.state.airlineId,
      departureAirportId: this.state.departureAirportId,
      arrivalAirportId: this.state.arrivalAirportId,
      departureTime: this.state.departureTime,
      arrivalTime: this.state.arrivalTime,
      flightFare: this.state.flightFare,
      totalSeats: this.state.totalSeats,
    };
    console.log(flight);
    AdminService.addFlight(flight)
      .then((res) => {
        this.setState({ message: "Flight added successfully." });
        this.props.history.push("/flight");
      })
      .catch((err) => {
        console.log("in err ", err.response.data);
        this.setState({ message: err.response.data.message });
        // this.props.history.push("/flight");
      });
  };

  componentDidMount = () => {
    AdminService.getAirlines().then(
      response => {
        console.log(response.data);
        this.setState({
          airlines: response.data
        })
      },
      error => {
             const resMessage = (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            this.setState({
              message: resMessage
            })
        
      });
      AdminService.getAirports().then(
        (response) => {
          console.log(response.data);
          this.setState({
            airports: response.data,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            message: resMessage,
          });
        }
      );
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    
    return (
      <div className="container">
        <h2 className="text-center">Add Flight</h2>
        {this.state.message ? (
          <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
            <Alert severity="error">{this.state.message}</Alert>
          </Stack>
        ) : (
          ""
        )}
        <form>
          <div className="form-group">
            <label>Flight Number:</label>
            <input
              type="text"
              placeholder="Flight Number"
              name="flightNo"
              className="form-control"
              value={this.state.airportNumber}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Select Airline:</label>
            <select
              name="airlineId"
              class="form-select form-control"
              aria-label="Disabled select example"
              value={this.state.airlineId}
              onChange={this.onChange}
            >
              <option selected>Select </option>
              {this.state.airlines.map((airline) => (
                <option value={airline.id}>{airline.airlineName}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Departure Airport:</label>
            <select
              name="departureAirportId"
              class="form-select form-control"
              aria-label="Disabled select example"
              value={this.state.departureAirportId}
              onChange={this.onChange}
            >
              <option selected>Select </option>
              {this.state.airports.map((airport) => (
                <option value={airport.id}>{airport.airportName}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Departure Time:</label>
            <input
              type="datetime-local"
              placeholder="departureTime"
              name="departureTime"
              className="form-control"
              value={this.state.departureTime}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Select Destination Airport:</label>
            <select
              name="arrivalAirportId"
              class="form-select form-control"
              aria-label="Disabled select example"
              value={this.state.arrivalAirportId}
              onChange={this.onChange}
            >
              <option selected>Select </option>
              {this.state.airports.map((airport) => (
                <option value={airport.id}>{airport.airportName}</option>
              ))}
            </select>
            {this.state.arrivalAirportId ===
            this.state.departureAirportId ? (
              <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
                <Alert severity="error">
                  Destination airport can not be same as departure airport
                </Alert>
              </Stack>
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <label>Destination Time:</label>
            <input
              type="datetime-local"
              placeholder="arrivalTime"
              name="arrivalTime"
              className="form-control"
              value={this.state.arrivalTime}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Flight Fare : </label>
            <input
              type="number"
              placeholder="flightFare"
              name="flightFare"
              className="form-control"
              value={this.state.flightFare}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Total Seats : </label>
            <input
              type="number"
              placeholder="totalSeats"
              name="totalSeats"
              className="form-control"
              value={this.state.totalSeats}
              onChange={this.onChange}
            />
          </div>

          <button className="btn btn-success" onClick={this.addFlight}>
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddFlight;
