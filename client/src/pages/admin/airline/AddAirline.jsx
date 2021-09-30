import { Alert, Button, Stack } from '@mui/material';
import React, {useState} from 'react'
import { useHistory } from 'react-router';
import AdminService from "../../../services/admin.service";

function Airline() {
  const history = useHistory();
  const [airlineName, setAirlineName] = useState('');
  const [logoPath, setLogoPath] = useState("")
  const [message, setMessage] = useState("")


  const handleSubmit = (e) =>{

      
        const airline = { airlineName, logoPath };
        console.log(airline)
        AdminService.addAirline(airline)
          .then((res) => {
            setMessage("Airline added successfully.");
            history.push("/airline");
          })
          .catch((err) => {
            console.log("in err ", err.response.data);
            setMessage(err.response.data.message);
            // history.push("/airline");
          });
      
  }

  return (
    <div>
      <h2 style={{ marginLeft: "200px" }}>Add Airline</h2>
      <div
        style={{
          marginLeft: "100px",
          marginTop: "50px",
          border: "0.3px solid black",
          width: "400px",
        }}
      >
        <div className="form-group" style={{ margin: "20px" }}>
          <label>Airline Name </label>
          {message ? (
            <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
              <Alert severity="error">{message}</Alert>
            </Stack>
          ) : (
            ""
          )}
          <input
            style={{ width: "300px" }}
            className="form-control"
            type="text"
            onChange={(e) => setAirlineName(e.target.value)}
          />
          {airlineName.length > 10 ? (
            <Stack sx={{ width: "100%", marginBottom: 3 }} spacing={2}>
              <Alert severity="error">
                Airline Name should contain less tahn 10 character
              </Alert>
            </Stack>
          ) : (
            ""
          )}
        </div>
        <div className="form-group" style={{ margin: "20px" }}>
          <label>Airline Logo </label>
          <input
            type="file"
            name="file"
            alt="image"
            onChange={(e) =>
              setLogoPath("/images/airline_logo/" + e.target.files[0].name)
            }
          />
        </div>
        <div className="form-group" style={{ margin: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={(e) => handleSubmit()}
          >
            Add Airline
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Airline;