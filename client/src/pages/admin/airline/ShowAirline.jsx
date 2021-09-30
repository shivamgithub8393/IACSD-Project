import { Alert, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import AdminService from "../../../services/admin.service";

function ShowAirline() {
  const history = useHistory();
  const [airlines, setAirlines] = useState([]);
  const [message, setMessage] = useState("");

  const getData = () => {
    AdminService.getAirlines().then(
      (response) => {
        console.log(response.data);
        setAirlines(response.data);
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

  const deleteAirlineData = (id) => {
    AdminService.deleteAirline(id).then(
      (res) => {
        setMessage("Airline deleted successfully.");

        setAirlines(airlines.filter((airline) => airline.id !== id));
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

  const addAirline = () => {
    // window.localStorage.removeItem("userId");
    history.push("/airline/add");
  };

  return (
    <div>
      <h2 className="text-center">Airline Details</h2>
      <button
        className="btn btn-primary"
        style={{ width: "100px", marginLeft:"20px" }}
        onClick={() => addAirline()}
      >
        {" "}
        Add Airline
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
            <th>Airline Name</th>
            <th>Airline Logo</th>
          </tr>
        </thead>
        <tbody>
          {airlines.map((airline) => (
            <tr key={airline.id}>
              <td>{airline.airlineName}</td>
              <td><img src={airline.logoPath} width="30" height="30" alt=""/></td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAirlineData(airline.id)}
                >
                  {" "}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowAirline;
