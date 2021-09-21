import React from 'react'
import {TextField, Typography} from '@material-ui/core';

function Home() {
  return (
    <div>
      <Typography variant="h4" color="textPrimary" align="center">
        Airline ticket Booking System
      </Typography>
      <img
        src="images/Airoplane.jpg"
        alt="Airplane_Image"
        width="100%"
        height="100%"
      />
      <TextField name="userEmail" label="Email" variant="outlined" />
    </div>
  );
}

export default Home
