package com.atbs.dto;

import java.util.Set;

import javax.validation.constraints.*;
 
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String firstName;
    @NotBlank
    @Size(min = 3, max = 20)
    private String lastName;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String userEmail;
    
    private Set<String> role;
    
    @NotBlank
    @Size(min = 1, max = 40)
    private String password;
 
    public String getFirstName() {
	  return firstName;
	}

	public void setFirstName(String firstName) {
	  this.firstName = firstName;
	}

	public String getLastName() {
	  return lastName;
	}

	public void setLastName(String lastName) {
	  this.lastName = lastName;
	}

	public String getUserEmail() {
	  return userEmail;
	}

	public void setUserEmail(String userEmail) {
	  this.userEmail = userEmail;
	}

	public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Set<String> getRole() {
      return this.role;
    }
    
    public void setRole(Set<String> role) {
      this.role = role;
    }
}
