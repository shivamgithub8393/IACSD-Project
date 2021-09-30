package com.atbs.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {
  private int id;
  private String firstName;
  private String lastName;
  private String userEmail;
  private String password;
  private String encryptedPassword;
}
