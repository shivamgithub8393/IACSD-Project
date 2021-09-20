package com.atbs.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

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
	@Column(length=30, unique = true, nullable = false)
	private String email;
	@Enumerated(EnumType.STRING)
	@Column(length=30)
	private GovernmentIdType governmentIdType;
	@Column(length = 20)
	private String governmentIdNumber;
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="booking_id" )
	private BookingDetails booking;
	
	
	// these are not neccessary
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="flight_id" )
	private Flight flight;
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="user_id" )
	private User user;
	
	
}
