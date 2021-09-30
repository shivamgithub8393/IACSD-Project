import { Alert, Stack } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import AdminService from "../../../services/admin.service"


function ShowAirport() {
  const history = useHistory();
  const [airports, setAirports] = useState([])
  const [message, setMessage] = useState('')

  const getData = () =>{
    AdminService.getAirports()
    .then(
      response => {
        console.log(response.data);
        setAirports(response.data);
      },
      error => {
             const resMessage = (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            setMessage(resMessage)
        
      }
    );
  }
  useEffect(() => {
    getData();
  },[])

  const deleteAirportData = (id) =>{
    AdminService.deleteAirport(id).then((res) => {
      setMessage("Airport deleted successfully.");
      setAirports(airports.filter(airport => airport.id !== id))
      setMessage("")
    },
      error => {
             const resMessage = (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            setMessage(resMessage)
        
      });
  }

   const addAirport = () => {
        // window.localStorage.removeItem("userId");
        history.push('/airport/add');
    }

  return (
    <div>
      <h2 className="text-center">Airport Details</h2>
      <button
        className="btn btn-primary"
        style={{ width: "100px", marginLeft: "20px" }}
        onClick={() => addAirport()}
      >
        {" "}
        Add Airport
      </button>
      {message ? (
        <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
          <Alert severity="error">{message}</Alert>
        </Stack>
      ) : (
        ""
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="hidden">Id</th>
            <th>Airport Number</th>
            <th>Airport Name</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {airports.map((airport) => (
            <tr key={airport.id}>
              <td>{airport.airportNumber}</td>
              <td>{airport.airportName}</td>
              <td>{airport.city}</td>
              <td>{airport.state}</td>
              <td>{airport.country}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAirportData(airport.id)}
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

export default ShowAirport;
