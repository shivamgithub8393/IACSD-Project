package com.atbs.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atbs.dto.BookingRequest;
import com.atbs.dto.ErrorResponse;
import com.atbs.dto.FlightSearchRequest;
import com.atbs.dto.ReservationRequest;
import com.atbs.model.BookingDetails;
import com.atbs.model.Flight;
import com.atbs.model.Passenger;
import com.atbs.model.Status;
import com.atbs.service.IFlightService;
import com.atbs.service.IReservationService;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {
  @Autowired
  private IFlightService flightService;
  @Autowired
  private IReservationService reservationService;

//get all flight details
  @GetMapping("/flights")
  public ResponseEntity<List<Flight>> getAllFlightDetails() {
	System.out.println("in get all flight method");
	return ResponseEntity.ok(flightService.getAllFlight());
  }

  // search Flight with some criteria (fromAirport - toAirport , departureTime)
  @PostMapping("/flights/search")
  public ResponseEntity<?> searchFlight(@RequestBody FlightSearchRequest flight) {
	System.out.println("in search flight method");
	System.out
		.println(flight.getArrivalAirportId() + " " + flight.getDepartureAirportId() + " " + flight.getDepartureDate());
	return ResponseEntity.ok(flightService.searchFlight(flight));

  }

//Flight booking
  @Transactional // if method cause any error it will rollback whole transaction
  @PostMapping("/book_flight")
  public ResponseEntity<?> bookFlight(@RequestBody ReservationRequest request) {

	// add passenger information
	try {
	  List<Passenger> passengerList = reservationService.addPassenger(request.getPassenger());
	  if (passengerList.isEmpty()) {
		return new ResponseEntity<>(new ErrorResponse("No Passenger Found", "Give atleast 1 passenger"),
			HttpStatus.BAD_REQUEST);
	  }
	} catch (Exception e) {
	  return new ResponseEntity<>(new ErrorResponse("Passenger Adding failed!!!", e.getMessage()),
		  HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// booking
	try {
	  BookingDetails booking = reservationService.bookFlight(request.getFlightId(), request.getUserId(),
		  request.getPassenger());
	  if (booking.getBookingStatus().equals(Status.CANCELLED)) {
		return new ResponseEntity<>(new ErrorResponse("Booking Failed", "Seats are full"), HttpStatus.BAD_REQUEST);
	  }
	  return ResponseEntity.ok(booking);
	} catch (Exception e) {

	  return new ResponseEntity<>(new ErrorResponse("Booking Failed", e.getMessage()), HttpStatus.BAD_REQUEST);
	}
  }

  // cancel reservation
  @PostMapping("/cancel_reservation")
  public ResponseEntity<?> cancelReservation(@RequestBody BookingRequest bookingId) {
	try {
	  return ResponseEntity.ok(reservationService.cancelReservation(bookingId.getBookingId()));
	} catch (Exception e) {
	  return new ResponseEntity<>(new ErrorResponse("Reseration cancellation failed", e.getMessage()),
		  HttpStatus.BAD_REQUEST);
	}
  }
  
  @GetMapping("/show_booking/{userId}")
  public ResponseEntity<?> showBooking(@PathVariable int userId){
	try {
	  return ResponseEntity.ok(reservationService.getBookingById(userId));
	} catch (Exception e) {
	  return new ResponseEntity<>(new ErrorResponse("User Id is not valid", e.getMessage()),
		  HttpStatus.BAD_REQUEST);
	}
  }

}
