package com.atbs.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atbs.custom_exception.UserHandlingException;
import com.atbs.dto.FlightRequest;
import com.atbs.dto.FlightSearchRequest;
import com.atbs.model.Airline;
import com.atbs.model.Airport;
import com.atbs.model.Flight;
import com.atbs.repository.FlightRepository;

@Service
@Transactional
public class FlightServiceImpl implements IFlightService {
  @Autowired
  private FlightRepository flightRepo;
  @Autowired
  private IAirlineService airlineService;
  @Autowired
  private IAirportService airportService;

  @Override
  public Flight addFlight(FlightRequest flightReq) {
	Airline airline = airlineService.findAirline(flightReq.getAirlineId());
	  Airport departureAirport = airportService.findAirportById(flightReq.getDepartureAirportId());
	  Airport arrivalAirport = airportService.findAirportById(flightReq.getArrivalAirportId());
	  
	  Flight flight = new Flight();
	  flight.setFlightNo(flightReq.getFlightNo());
	  flight.setAirline(airline);
	  flight.setDepartureAirport(departureAirport);
	  flight.setArrivalAirport(arrivalAirport);
	  flight.setDepartureTime(flightReq.getDepartureTime());
	  flight.setArrivalTime(flightReq.getArrivalTime());
	  flight.setFlightFare(flightReq.getFlightFare());
	  flight.setTotalSeats(flightReq.getTotalSeats());
	  flight.setAvailableSeats(flightReq.getTotalSeats());
	return flightRepo.save(flight);
  }

  @Override
  public String deleteFlight(int flightId) {
	flightRepo.deleteById(flightId);
	return "Flight Details Deleted with id" + flightId;
  }

  @Override
  public Flight updateFlight(Flight flight) {
	return flightRepo.save(flight);
  }

  // get all flights
  @Override
  public List<Flight> getAllFlight() {
	return flightRepo.findAll();
  }

  // get flight by id
  @Override
  public Flight getFlightById(int flightId) {
	return flightRepo.findById(flightId).orElseThrow(() -> new UserHandlingException("Given id is not valid"));
  }

  @Override
  public List<Flight> searchFlight(FlightSearchRequest flight) {
	
	return null;
  }

}
