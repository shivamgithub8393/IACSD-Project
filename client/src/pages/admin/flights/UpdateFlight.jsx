import { Alert, Stack } from "@mui/material";
import React, { Component } from "react";
import AdminService from "../../../services/admin.service";

class UpdateFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:"",
      flightNo:"",
      departureTime: "",
      arrivalTime: "",
      message: null,
    };

    this.updateFlight = this.updateFlight.bind(this);
  }

  componentDidMount = () =>{
    this.setState({
      id: window.localStorage.getItem("id"),
      flightNo: window.localStorage.getItem("flightNo")
    })
  }

  updateFlight = (e) => {
    e.preventDefault();
    let flight = {
      departureTime: this.state.departureTime,
      arrivalTime: this.state.arrivalTime,
    };
    console.log(this.state.id, flight);
    AdminService.updateFlight(this.state.id,flight)
      .then((res) => {
        this.setState({ message: "Flight updated successfully." });
        this.props.history.push("/flight");
      })
      .catch((err) => {
        console.log("in err ", err.response.data);
        this.setState({ message: err.response.data.message });
        // this.props.history.push("/flight");
      });
  };



  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    // console.log(this.props.location.flightId);
    return (
      <div className="container">
        <h2 className="text-center">Update Flight </h2>
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
              disabled
              value={this.state.flightNo}
            />
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
          <button className="btn btn-success" onClick={this.updateFlight}>
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateFlight;
