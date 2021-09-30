package com.atbs.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atbs.dto.ErrorResponse;
import com.atbs.dto.FlightSearchRequest;
import com.atbs.dto.LoginRequest;
import com.atbs.dto.SignupRequest;
import com.atbs.model.Airline;
import com.atbs.model.Airport;
import com.atbs.model.ERole;
import com.atbs.model.Flight;
import com.atbs.model.Role;
import com.atbs.model.User;
import com.atbs.payload.response.JwtResponse;
import com.atbs.payload.response.MessageResponse;
import com.atbs.repository.RoleRepository;
import com.atbs.repository.UserRepository;
import com.atbs.security.jwt.JwtUtils;
import com.atbs.security.services.UserDetailsImpl;
import com.atbs.service.IFlightService;
import com.atbs.service.IAirlineService;
import com.atbs.service.IAirportService;

@RestController
@RequestMapping("/")
@CrossOrigin 
public class UserController {
  @Autowired
  private IFlightService flightService;
  @Autowired
  private IAirlineService airlineService;
  @Autowired
  private IAirportService airportService;
  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  private JwtUtils jwtUtils;

  public UserController() {
	System.out.println("In constr of " + getClass().getName());
  }
  
  
//get all airline details
  @GetMapping("/airlines")
  public ResponseEntity<List<Airline>> getAllAirline() {
	System.out.println("in get all airlines method");
	return ResponseEntity.ok(airlineService.getAllAirlines());
  }
  
//get all flight details
  @GetMapping("/flights")
  public ResponseEntity<List<Flight>> getAllFlightDetails() {
	System.out.println("in get all flight method");
	return ResponseEntity.ok(flightService.getAllFlight());
  }
  
  @GetMapping("/flight/{id}")
  public ResponseEntity<Flight> getFlightById(@PathVariable int id) {
	
	return ResponseEntity.ok(flightService.getFlightById(id));
  }
  
  // get all airport
  @GetMapping("/airports")
  public ResponseEntity<List<Airport>> getAllAirport() {
	System.out.println("in get all airports method");
	return ResponseEntity.ok(airportService.getAllAirports());
  }

  // ------------------------------ JWT
  
  
  
  

  @PostMapping("/user/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
try {
	Authentication authentication = authenticationManager
		.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

	SecurityContextHolder.getContext().setAuthentication(authentication);
	String jwt = jwtUtils.generateJwtToken(authentication);
	
	
	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
	List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
		.collect(Collectors.toList());

	return ResponseEntity
		.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
}catch(Exception e) {
  return new ResponseEntity<>(new ErrorResponse("Invalid! Email or Password", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
}
  }

  @PostMapping("/user/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
	if (userRepository.existsByUserEmail(signUpRequest.getUserEmail())) {
	  return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
	}

	// Create new user's account
	User user = new User(signUpRequest.getUserEmail(),signUpRequest.getFirstName(), signUpRequest.getLastName(),
		encoder.encode(signUpRequest.getPassword()));

	Set<String> strRoles = signUpRequest.getRole();
	Set<Role> roles = new HashSet<>();
	System.out.println(strRoles);
	
	if (strRoles == null) {
	  Role userRole = roleRepository.findByName(ERole.ROLE_USER)
		  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	  roles.add(userRole);
	} else {

	  
		
	  strRoles.forEach(role -> {
		System.out.println(role);
		switch (role) {
		case "ROLE_ADMIN":
		  Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
			  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		  roles.add(adminRole);

		  break;
		default:
		  Role userRole = roleRepository.findByName(ERole.ROLE_USER)
			  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		  roles.add(userRole);
		}
	  });
	}

	user.setRoles(roles);
	userRepository.save(user);

	return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  // -----------------

//  @PostMapping("/user/register")
//  public ResponseEntity<?> postRegister(@RequestBody User user) {
//	return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
//  }
//
//  @PostMapping("/user/login")
//  public ResponseEntity<?> validateUserLogin(@RequestBody LoginRequest user) {
//	System.out.println("in login page " + user);
////	System.out.println(user.getUserEmail());
//	try {
//	  User validUser = userService.validateUser(user);
//	  if(validUser.getUserType().equals(user.getUserType())) {
//		return ResponseEntity.ok(validUser);
//	  }
//		  return new ResponseEntity<>(new ErrorResponse("Invalid credentials", "User Type Is Not Valid"), HttpStatus.BAD_REQUEST);
//	  
//	} catch (RuntimeException e) {
//	  System.out.println("err in validate login " + e);
//	  return new ResponseEntity<>(new ErrorResponse("Failed to login", e.getMessage()), HttpStatus.BAD_REQUEST);
//	}
//  }


  // search Flight with some criteria (fromAirport - toAirport , departureTime)
  @PostMapping("/flights/search")
  public ResponseEntity<List<Flight>> searchFlight(@RequestBody FlightSearchRequest flight) {
	System.out.println("in search flight method");
	System.out
		.println(flight.getArrivalAirportId() + " " + flight.getDepartureAirportId() + " " + flight.getDepartureDate());
	return ResponseEntity.ok(flightService.searchFlight(flight));
  }

}
