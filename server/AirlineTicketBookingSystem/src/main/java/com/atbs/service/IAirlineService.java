package com.atbs.service;

import com.atbs.model.Airline;

public interface IAirlineService {
  Airline addNewAirLine(Airline airline);
  String deleteAirline(int airlineId);
}
