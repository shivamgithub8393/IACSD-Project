package com.atbs.controller;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atbs.dto.ErrorResponse;
import com.atbs.dto.ResponseDTO;
import com.atbs.model.Airline;
import com.atbs.model.Airport;
import com.atbs.service.IAirlineService;
import com.atbs.service.IAirportService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
  @Autowired
  private IAirlineService airlineService;
  @Autowired
  private IAirportService airportService;
  
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
  
  
  // cancel flight
  
  
  // update flight
  
  
}
