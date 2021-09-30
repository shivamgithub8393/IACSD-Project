package com.atbs.service;

import java.util.List;

import com.atbs.model.Airline;

public interface IAirlineService {
  Airline addNewAirLine(Airline airline);
  String deleteAirline(int airlineId);
  Airline findAirline(int airlineId);
  List<Airline> getAllAirlines();
}
