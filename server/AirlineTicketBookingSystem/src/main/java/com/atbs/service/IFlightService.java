package com.atbs.service;

import java.util.List;

import com.atbs.dto.FlightRequest;
import com.atbs.dto.FlightSearchRequest;
import com.atbs.model.Flight;

public interface IFlightService {
  Flight addFlight(FlightRequest flight);
  String deleteFlight(int flightId);
  Flight updateFlight(Flight flight);
  // get all flight details
  List<Flight> getAllFlight();
  // add method to get flight by id
  Flight getFlightById(int flightId);
  // add method to search for flight between two airport
  List<Flight> searchFlight(FlightSearchRequest flight);
}
