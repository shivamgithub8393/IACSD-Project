package com.atbs.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="passenger")
public class Passenger extends BaseEntity {
	@Column(length=30, nullable = false)
	private String firstName;
	@Column(length=30, nullable = false)
	private String lastName;
	@Enumerated(EnumType.STRING)
	@Column(length=20, nullable = false)
	private GenderType gender; 
	private int age;
	private String Address;
	@Column(length=10)
	private String contactNumber;
	@Column(length=30, nullable = false)
	private String email;
	@Enumerated(EnumType.STRING)
	@Column(length=30)
	private GovernmentIdType governmentIdType;
	@Column(length = 20)
	private String governmentIdNumber;
	
	// these are not neccessary
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="flight_id" )
	private Flight flight;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="user_id" )
	private User user;
	
	
}
