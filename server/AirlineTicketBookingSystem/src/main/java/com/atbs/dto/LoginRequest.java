package com.atbs.dto;

import com.atbs.model.UserType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data 
public class LoginRequest {
  private String userEmail;
  private String password;
  private UserType userType;
}
