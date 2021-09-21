package com.atbs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.atbs.dto.LoginRequest;
import com.atbs.dto.LoginResponse;
import com.atbs.model.User;
import com.atbs.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
  @Autowired
  private UserRepository userRepo;

  public UserServiceImpl() {
  }

  @Override
  public LoginResponse validateUser(LoginRequest user) {
	return userRepo.findByUserEmailAndPassword(user.getUserEmail(), user.getPassword())
		.orElseThrow(() -> new RuntimeException("Invalid Email or Password !!!"));

  }

  @Override
  public User addUser(User user) {
	return userRepo.save(user);
  }
}
