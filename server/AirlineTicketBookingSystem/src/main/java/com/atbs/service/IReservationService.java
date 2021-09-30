package com.atbs.service;

import java.util.List;

import com.atbs.model.BookingDetails;
import com.atbs.model.Passenger;

public interface IReservationService {
  List<Passenger> addPassenger(List<Passenger>  passenger);
  BookingDetails bookFlight(int flightId, int userId, List<Passenger> passengerList);
  BookingDetails cancelReservation(int bookingId);
  List<BookingDetails> getBookingById(int userId);
}
