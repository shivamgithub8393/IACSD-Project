import { Typography } from '@mui/material';
import React from 'react'

function Home() {
  return (
    <div>
      <Typography variant="h3"align="center" sx={{color:"black", m:2, fontWeight:"600" }}>
        Airline Ticket Booking System
      </Typography>
      <img
        src="images/airplane2.jpg"
        alt="Airplane_Image"
        width="100%"
        height="600px"
      />
    </div>
  );
}

export default Home
