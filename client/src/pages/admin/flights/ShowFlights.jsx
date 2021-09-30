import { Alert, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import AdminService from "../../../services/admin.service";

function ShowFlight() {
  const history = useHistory();
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState("");

  const getData = () => {
    AdminService.getFlights().then(
      (response) => {
        console.log(response.data);
        setFlights(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteFlightData = (id) => {
    AdminService.deleteFlight(id).then(
      (res) => {
        setMessage("Flight deleted successfully.");

        setFlights(flights.filter((flight) => flight.id !== id));
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  const updateFlightData = (id, flightNo) => {
        window.localStorage.setItem("id", id);
        window.localStorage.setItem("flightNo", flightNo);
        history.push('/flight/update');
    }

  const addFlight = () => {
    window.localStorage.removeItem("flightId");
    history.push("/flight/add");
  };

  return (
    <div>
      <h2 className="text-center">Flight Details</h2>
      <button
        className="btn btn-primary"
        style={{ width: "100px", marginLeft: "20px" }}
        onClick={() => addFlight()}
      >
        {" "}
        Add Flight
      </button>
      {message ? (
        <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
          <Alert severity="success">{message}</Alert>
        </Stack>
      ) : (
        ""
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="hidden">Id</th>
            <th>Flight Number</th>
            <th>Airline Logo</th>
            <th>Airline Name</th>
            <th>From</th>
            <th>To</th>
            <th>Departure Time</th>
            <th>Destination time</th>
            <th>Flight Fare</th>
            <th>Available Seats</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNo}</td>
              <td>
                <img
                  src={flight.airline.logoPath}
                  width="30"
                  height="30"
                  alt=""
                />
              </td>
              <td>{flight.airline.airlineName}</td>
              <td>{flight.departureAirport.city}</td>
              <td>{flight.arrivalAirport.city}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.flightFare}</td>
              <td>{flight.availableSeats}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteFlightData(flight.id)}
                >
                  {" "}
                  Delete
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => updateFlightData(flight.id, flight.flightNo)}
                  style={{ marginLeft: "20px" }}
                >
                  {" "}
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowFlight;
