package com.atbs.service;

import com.atbs.dto.LoginRequest;
import com.atbs.dto.LoginResponse;
import com.atbs.model.User;

public interface IUserService {
  LoginResponse validateUser(LoginRequest user);
  User addUser(User user);
}
