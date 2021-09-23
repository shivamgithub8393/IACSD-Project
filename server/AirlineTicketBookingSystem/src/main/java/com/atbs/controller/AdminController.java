package com.atbs.controller;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.atbs.custom_exception.UserHandlingException;
import com.atbs.dto.ErrorResponse;
import com.atbs.dto.FlightRequest;
import com.atbs.dto.FlightUpdateRequest;
import com.atbs.dto.ResponseDTO;
import com.atbs.model.Airline;
import com.atbs.model.Airport;
import com.atbs.model.Flight;
import com.atbs.service.IAirlineService;
import com.atbs.service.IAirportService;
import com.atbs.service.IFlightService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
  @Autowired
  private IAirlineService airlineService;
  @Autowired
  private IAirportService airportService;
  @Autowired
  private IFlightService flightService;
  
  // add airline 
  @PostMapping("/airline/add")
  public ResponseEntity<?> addAirlineDetails(@RequestBody Airline airline) {
	try {
	return new ResponseEntity<>(airlineService.addNewAirLine(airline), HttpStatus.CREATED);
	}catch(ConstraintViolationException e) {
	  return new ResponseEntity<>(new ErrorResponse("Adding Airline failed!!!!!", e.getMessage()),
			HttpStatus.INTERNAL_SERVER_ERROR);
	}
  }
  
  // remove airline
  @DeleteMapping("/airline/delete/{airlineId}")
  public ResponseEntity<ResponseDTO> deleteAirline(@PathVariable int airlineId){
	
	return ResponseEntity.ok(new ResponseDTO(airlineService.deleteAirline(airlineId)));
  }
  
  // add airport 
  @PostMapping("/airport/add")
  public ResponseEntity<?> addAirportDetails(@RequestBody Airport airport) {
	try {
	return new ResponseEntity<>(airportService.addNewAirport(airport), HttpStatus.CREATED);
	}catch(ConstraintViolationException e) {
	  return new ResponseEntity<>(new ErrorResponse("Adding Airport failed!!!!!", e.getMessage()),
			HttpStatus.INTERNAL_SERVER_ERROR);
	}
  }
  
  // remove airport
  @DeleteMapping("/airport/delete/{airportId}")
  public ResponseEntity<ResponseDTO> deleteAirport(@PathVariable int airportId){
	
	return ResponseEntity.ok(new ResponseDTO(airportService.deleteAirport(airportId)));
  }
  
  // add new flight details
  @PostMapping("/flight/add")
  public ResponseEntity<?> addFlightDetails(@RequestBody FlightRequest flightReq) {
	try {
	  
	  
	return new ResponseEntity<>(flightService.addFlight(flightReq), HttpStatus.CREATED);
	}catch(ConstraintViolationException e) {
	  return new ResponseEntity<>(new ErrorResponse("Adding Flight failed!!!!!", e.getMessage()),
			HttpStatus.INTERNAL_SERVER_ERROR);
	}
  }
  
  // cancel flight
  @DeleteMapping("/flight/delete/{flightId}")
  public ResponseEntity<ResponseDTO> deleteFlight(@PathVariable int flightId){
	
	return ResponseEntity.ok(new ResponseDTO(flightService.deleteFlight(flightId)));
  }
  
  // update flight
  @PutMapping("/flight/update/{flightId}")
  public ResponseEntity<?> updateFlightDetails(@PathVariable int flightId, @RequestBody FlightUpdateRequest updatedFlightData){
	try {
	return ResponseEntity.ok(flightService.updateFlight(flightId, updatedFlightData));
	}catch(RuntimeException e) {
	  return new ResponseEntity<>(new UserHandlingException("updating flight details failed"), HttpStatus.BAD_REQUEST);
	}
  }
  
}
