package com.atbs.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FlightUpdateRequest {
  private LocalDateTime departureTime;
	private LocalDateTime arrivalTime;
}
