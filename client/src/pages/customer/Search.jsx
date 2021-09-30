import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import UserService from "../../services/user.service";
import { Box } from "@mui/system";

function Search() {
  const [airports, setAirports] = useState([]);
  const [data, setData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const searchBetweenAirports = () => {
    const data = {
      departureAirportId: from,
      arrivalAirportId: to,
      departureDate: date,
    };
    console.log(from);
    console.log(to);
    console.log(data);
    UserService.getFlightsBetweenTwoAirports(data).then(
      (response) => {
        console.log(response.data);
        setData(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      }
    );
  };

  const getAirports = () => {
    UserService.getAirports().then(
      (response) => {
        console.log(response.data);
        setAirports(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        alert(resMessage);
      }
    );
  };

  useEffect(() => {
    getAirports();
  }, []);

  return (
    <div style={{ margin: 20 }}>
      <Container sx={{ m: 3 }}>
        <Box
          sx={{
            width: "100%",
            height: 100,
          }}
        >
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              From Airport
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              label="From"
            >
              {airports.map((airport) => (
                <MenuItem value={airport.id}>{airport.city}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              To Airport
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {airports.map((airport) => (
                <MenuItem value={airport.id}>{airport.city}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </FormControl>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <Button
              style={{ marginLeft: "30px" }}
              type="submit"
              variant="contained"
              color="secondary"
              onClick={searchBetweenAirports}
            >
              Search Flights
            </Button>
          </FormControl>
        </Box>
        {from === to ? (
          <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
            <Alert severity="error">
              Destination airport can not be same as departure airport
            </Alert>
          </Stack>
        ) : (
          ""
        )}
      </Container>
      <TableContainer>
        <Table
          style={{ minWidth: 650, maxWidth: 1000 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>Flight No</TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                Airline Logo
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                Airline Name
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                From Airport
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                To Airport
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                Departure Time
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                Destination Time
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                Flight Fare
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right">
                Available Seats
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.flightNo}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={row.airline.logoPath}
                    width="30"
                    height="30"
                    alt="airlineLogo"
                  />
                </TableCell>
                <TableCell align="right">{row.airline.airlineName}</TableCell>
                <TableCell align="right">
                  {row.departureAirport.airportName}
                </TableCell>
                <TableCell align="right">
                  {row.arrivalAirport.airportName}
                </TableCell>
                <TableCell align="right">{row.departureTime}</TableCell>
                <TableCell align="right">{row.arrivalTime}</TableCell>
                <TableCell align="right">{row.flightFare}</TableCell>
                <TableCell align="right">{row.availableSeats}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Search;
