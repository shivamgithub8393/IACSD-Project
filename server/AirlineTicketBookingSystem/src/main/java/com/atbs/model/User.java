package com.atbs.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity 
@Table(name="users")
public class User extends BaseEntity {
  @Column(length=30, unique = true, nullable = false)
  private String userEmail;
  @Column(length=20)
  @NotNull
  private String firstName;
  @Column(length=20)
  @NotNull
  private String lastName;
  @Column(length=500)
  @NotNull
  private String password;
  @Enumerated(EnumType.STRING)
  @Column(length=30)
  private UserType userType;  
}
