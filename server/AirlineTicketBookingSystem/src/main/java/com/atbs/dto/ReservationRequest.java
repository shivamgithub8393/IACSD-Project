package com.atbs.dto;

import java.util.List;

import com.atbs.model.Passenger;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReservationRequest {
  private List<Passenger> passenger;
  private int flightId;
  private int userId;
}
