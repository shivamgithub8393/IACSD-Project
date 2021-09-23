package com.atbs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atbs.dto.ErrorResponse;
import com.atbs.dto.FlightSearchRequest;
import com.atbs.dto.LoginRequest;
import com.atbs.model.Flight;
import com.atbs.model.User;
import com.atbs.service.IFlightService;
import com.atbs.service.IUserService;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin
public class UserController {
  @Autowired
  private IUserService userService;
  @Autowired
  private IFlightService flightService;

  public UserController() {
	System.out.println("In constr of " + getClass().getName());
  }

  @PostMapping("/user/register")
  public ResponseEntity<?> postRegister(@RequestBody User user) {
	return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
  }

  @PostMapping("/user/login")
  public ResponseEntity<?> validateUserLogin(@RequestBody LoginRequest user) {
	System.out.println("in login page " + user);
//	System.out.println(user.getUserEmail());
	try {
	  User validUser = userService.validateUser(user);
	  if(validUser.getUserType().equals(user.getUserType())) {
		return ResponseEntity.ok(validUser);
	  }
		  return new ResponseEntity<>(new ErrorResponse("Invalid credentials", "User Type Is Not Valid"), HttpStatus.BAD_REQUEST);
	  
	} catch (RuntimeException e) {
	  System.out.println("err in validate login " + e);
	  return new ResponseEntity<>(new ErrorResponse("Failed to login", e.getMessage()), HttpStatus.BAD_REQUEST);
	}
  }

//get all flight details
  @GetMapping("/flights")
  public ResponseEntity<?> getAllFlightDetails() {
	System.out.println("in get all flight method");
	return ResponseEntity.ok(flightService.getAllFlight());
//	return new ResponseEntity<>(new ErrorResponse("sssss", "sshnf"), HttpStatus.NOT_FOUND);
  }

  // search Flight with some criteria (fromAirport - toAirport , departureTime)
  @PostMapping("/flights/search")
  public ResponseEntity<List<Flight>> searchFlight(@RequestBody FlightSearchRequest flight) {
	System.out.println("in search flight method");
	System.out
		.println(flight.getArrivalAirportId() + " " + flight.getDepartureAirportId() + " " + flight.getDepartureDate());
	return ResponseEntity.ok(flightService.searchFlight(flight));
  }

}
