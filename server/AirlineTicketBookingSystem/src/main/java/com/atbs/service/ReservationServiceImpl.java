package com.atbs.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.atbs.custom_exception.UserHandlingException;
import com.atbs.dto.ErrorResponse;
import com.atbs.model.BookingDetails;
import com.atbs.model.Flight;
import com.atbs.model.Passenger;
import com.atbs.model.Status;
import com.atbs.model.User;
import com.atbs.repository.BookingDetailsRepository;
import com.atbs.repository.FlightRepository;
import com.atbs.repository.PassengerRepository;
import com.atbs.repository.UserRepository;

@Service
@Transactional
public class ReservationServiceImpl implements IReservationService {
  @Autowired
  private PassengerRepository passengerRepo;
  @Autowired
  private FlightRepository flightRepo;
  @Autowired
  private UserRepository userRepo;
  @Autowired
  private BookingDetailsRepository bookingRepo;
  
	// add passenger information
  @Override
  public List<Passenger> addPassenger(List<Passenger> passenger) {
	 return passengerRepo.saveAll(passenger);
  }

//add booking details
  @Override
  public BookingDetails bookFlight(int flightId, int userId, List<Passenger> passengerList) {
	Flight flight = flightRepo.findById(flightId).get();
	User user = userRepo.findById(userId).get();
	
		BookingDetails bookingDetails = new BookingDetails();
		bookingDetails.setBookingStatus(Status.SUCCESS);
		bookingDetails.setBookingTime(LocalDateTime.now());
		bookingDetails.setFlight(flight);
		bookingDetails.setUser(user);
		bookingDetails.setPassenger(passengerList);
		bookingDetails.setNumberOfSeats(passengerList.size());
		
		// set available seats
		if(flight.getAvailableSeats()-bookingDetails.getNumberOfSeats() > 0)
		flight.setAvailableSeats(flight.getAvailableSeats() - bookingDetails.getNumberOfSeats());
		else {
		  bookingDetails.setBookingStatus(Status.CANCELLED);
		  return bookingDetails;
		}
		// flightRepo.save(flight);
		
	return bookingRepo.save(bookingDetails);
  }
  
  // cancel reservation
  @Override
  public BookingDetails cancelReservation(int bookingId) {
	BookingDetails bookingDetails = bookingRepo.findById(bookingId).get();
	if(bookingDetails.getBookingStatus().equals(Status.SUCCESS)) {

	bookingDetails.setBookingStatus(Status.CANCELLED);
	Flight flight = bookingDetails.getFlight();
	
	flight.setAvailableSeats(flight.getAvailableSeats() + bookingDetails.getNumberOfSeats());
	}else {
	  throw new UserHandlingException("Booking already cancelled");
	}
	
	// flightRepo.save(flight);
    return bookingDetails;
  }
}
