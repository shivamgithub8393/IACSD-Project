package com.atbs.service;

import java.util.List;

import com.atbs.model.Airport;

public interface IAirportService {
  Airport addNewAirport(Airport airport);
  String deleteAirport(int airportId);
  Airport findAirportById(int airportId);
  List<Airport> getAllAirports();
}
