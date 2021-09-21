package com.atbs.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FlightRequest {
	private String flightNo;
	private int airlineId;
	private int departureAirportId;
	private int arrivalAirportId;
	private LocalDateTime departureTime;
	private LocalDateTime arrivalTime;
	private double flightFare;
	private int TotalSeats;
	private int availableSeats;
}
