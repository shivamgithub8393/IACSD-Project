package com.atbs.model;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name="flight")
public class Flight extends BaseEntity {
	@NotNull
	@Column(length=10, unique = true)
	private String flightNo;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="airline_id" )
	private Airline airline;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="departure_airport_id" )
	private Airport departureAirport;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="arrival_airport_id" )
	private Airport arrivalAirport;
	@NotNull
	private LocalDateTime departureTime;
	@NotNull
	private LocalDateTime arrivalTime;
	@NotNull
	private double flightFare;
	@NotNull
	private int TotalSeats;
	@NotNull
	private int availableSeats;
	
//	private String flightStatus;
}
