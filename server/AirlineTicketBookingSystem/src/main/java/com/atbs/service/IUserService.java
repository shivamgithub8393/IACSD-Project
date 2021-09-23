package com.atbs.service;

import com.atbs.dto.LoginRequest;
import com.atbs.model.User;

public interface IUserService {
  User validateUser(LoginRequest user);
  User addUser(User user);
}
