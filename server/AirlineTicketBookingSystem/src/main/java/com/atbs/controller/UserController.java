package com.atbs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atbs.dto.ErrorResponse;
import com.atbs.dto.LoginRequest;
import com.atbs.model.User;
import com.atbs.service.IUserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
  @Autowired
  private IUserService userService;

  public UserController() {
	System.out.println("In constr of " + getClass().getName());
  }

  @PostMapping("/register")
  public ResponseEntity<?> postRegister(@RequestBody User user) {
	  return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<?> validateUserLogin(@RequestBody LoginRequest user) {
	System.out.println("in login page " + user);
//	System.out.println(user.getUserEmail());
	try {
	  return ResponseEntity.ok(userService.validateUser(user));
	} catch (RuntimeException e) {
	  System.out.println("err in validate login " + e);
	  return new ResponseEntity<>(new ErrorResponse("Failed to login", e.getMessage()), HttpStatus.BAD_REQUEST);
	}
  }

  // logout

}
