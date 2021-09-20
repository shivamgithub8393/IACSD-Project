package com.atbs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atbs.dto.LoginRequest;
import com.atbs.dto.LoginResponse;
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
  public User postRegister(@RequestBody User user) {
	  System.out.println("in register page " + user);
	  return userService.addUser(user);
	  
  }

  @PostMapping("/login")
  public LoginResponse postLogin(@RequestBody LoginRequest user) {
	System.out.println("in login page " + user);
//	System.out.println(user.getUserEmail());
	try {
		// validation using email password
	  LoginResponse user1 = userService.validateUser(user);
	  System.out.println(user1);
	  return user1;

	} catch (Exception e) {
	  System.out.println("error : " + e);
	  return null;
	}
  }

}
