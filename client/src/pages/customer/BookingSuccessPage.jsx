import { Typography } from '@mui/material'
import React from 'react'
import { Link, useHistory } from 'react-router-dom';

function BookingSuccessPage() {
  const history = useHistory();

  const handleClick =() =>{
    history.push("/customer/my_booking")
  }

  return (
    <div>
      <Typography variant="h3" sx={{
        mt:4,
        alignItems:"center"
      }}>
        Booking Successfull go to{" "}
        <Link
        sx={{color:"red"}}
          component="button"
          variant="body2"
          onClick={() => handleClick()}
        >
          MyBooking
        </Link>{" "}
      </Typography>
    </div>
  );
}

export default BookingSuccessPage
