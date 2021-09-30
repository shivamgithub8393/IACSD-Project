import { Alert, Stack } from "@mui/material";
import React, { Component } from "react";
import AdminService from "../../../services/admin.service";

class AddAirport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airportNumber: "",
      airportName: "",
      city: "",
      state: "",
      country: "",
      message: null,
    };
    this.addAirport = this.addAirport.bind(this);
  }

  addAirport = (e) => {
    e.preventDefault();
    let airport = {
      airportNumber: this.state.airportNumber,
      airportName: this.state.airportName,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
    };
    console.log(airport)
    AdminService.addAirport(airport)
      .then((res) => {
        this.setState({ message: "Airport added successfully." });
        this.props.history.push("/airport");
      })
      .catch((err) => {
        console.log("in err ", err.response.data);
        alert(err.response.data.message);
        this.props.history.push("/airport");
      });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Add Airport</h2>
        <form>
          <div className="form-group">
            <label>Airport Number:</label>
            <input
              type="text"
              placeholder="Airport Number"
              name="airportNumber"
              className="form-control"
              value={this.state.airportNumber}
              onChange={this.onChange}
            />
            {this.state.airportNumber.length > 6 ? (
              <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
                <Alert severity="error">
                  Airport Number should be less than 7 character
                </Alert>
              </Stack>
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <label>Airport Name:</label>
            <input
              type="text"
              placeholder="Airport Name"
              name="airportName"
              className="form-control"
              value={this.state.airportName}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>city:</label>
            <input
              type="text"
              placeholder="City"
              name="city"
              className="form-control"
              value={this.state.city}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              placeholder="State"
              name="state"
              className="form-control"
              value={this.state.state}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Country:</label>
            <input
              type="text"
              placeholder="country"
              name="country"
              className="form-control"
              value={this.state.country}
              onChange={this.onChange}
            />
          </div>

          <button className="btn btn-success" onClick={this.addAirport}>
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddAirport;
