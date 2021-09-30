package com.atbs.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
  
  @ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

  
  public User(String userEmail, @NotNull String firstName, @NotNull String lastName, @NotNull String password) {
	super();
	this.userEmail = userEmail;
	this.firstName = firstName;
	this.lastName = lastName;
	this.password = password;
  }
  
  
}
