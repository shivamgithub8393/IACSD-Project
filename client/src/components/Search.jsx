import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";


function Search() {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  const handleClick = () => {
    axios
      .get("http://localhost:8080/flights")
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          setData(res.data);
          console.log(res.data);
        }
        if (res === 500) {
          console.log("error");
          console.log(res);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log("Error Message : " + err.response.data.message);
        }
      });
  };
  const handleClick2 = () => {
    const data = {
      departureAirportId: from,
      arrivalAirportId: to,
      departureDate: date,
    };
    console.log(from);
    console.log(to);
    console.log(date);
    axios
      .post("http://localhost:8080/customer/flights/search", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setData(res.data);
          console.log(res.data);
        }
        if (res === 500) {
          console.log("error");
          console.log(res);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          console.log("Error Message : " + err.response.data.message);
        }
      });
  };

  return (
    <div style={{ margin: 20 }}>
      <label htmlFor="browser">From </label>
      <input
        list="from"
        name="from"
        id="browser"
        onChange={(e) => {
          setFrom(e.target.value);
        }}
      />
      <datalist id="from">
        <option data-value="6" value="6" />
        <option data-value="7" value="7" />
        <option data-value="Lucknow" />
        <option data-value="Pune" />
        <option data-value="Chandigarh" />
      </datalist>

      <label htmlFor="browser">To </label>
      <input
        list="to"
        name="to"
        id="browser"
        onChange={(e) => {
          setTo(e.target.value);
        }}
      />
      <datalist id="to">
        <option data-value="6" value="6" />
        <option data-value="7" value="7" />
        <option data-value="Lucknow" />
        <option data-value="Pune" />
        <option data-value="Chandigarh" />
      </datalist>

      <label>Date</label>
      <input
        type="date"
        name="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <Button
        style={{ marginLeft: "30px" }}
        type="submit"
        variant="contained"
        color="secondary"
        onClick={handleClick2}
      >
        Search Flight
      </Button>

      {/* <TextField
        label="From"
        variant="outlined"
        type="text"
        required
        onChange={(e) => {
          setFrom(e.target.value);
        }}
      />
      <TextField
        label="To"
        variant="outlined"
        type="text"
        required
        onChange={(e) => {
          setTo(e.target.value);
        }}
      />
      <TextField
        label="To"
        variant="outlined"
        type="date"
        required
        onChange={(e) => {
          setDate(e.target.value);
        }}
      /> */}
      <br />
      {/* <Button
        style={{ marginLeft: "30px"}}
        type="submit"
        variant="contained"
        color="secondary"
        onClick={handleClick2}
      >
        Search Between
      </Button> */}
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        Search
      </Button>
      <TableContainer>
        <Table
          style={{ minWidth: 650, maxWidth: 1000 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Flight No</TableCell>
              <TableCell align="right">Airline Name</TableCell>
              <TableCell align="right">From Airport</TableCell>
              <TableCell align="right">To Airport</TableCell>
              <TableCell align="right"></TableCell>
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
                <TableCell align="right">{row.airline.airlineName}</TableCell>
                <TableCell align="right">
                  {row.departureAirport.airportName}
                </TableCell>
                <TableCell align="right">
                  {row.arrivalAirport.airportName}
                </TableCell>
                <TableCell align="right">
                  {loggedIn ? (
                    <Button variant="contained" color="primary">
                      Book
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" disabled>
                      Book
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Search;
