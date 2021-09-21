package com.atbs.service;

import com.atbs.model.Airport;

public interface IAirportService {
  Airport addNewAirport(Airport airport);
  String deleteAirport(int airportId);
}
