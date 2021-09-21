package com.atbs.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atbs.custom_exception.UserHandlingException;
import com.atbs.model.Airport;
import com.atbs.repository.AirportRepository;

@Service
@Transactional
public class AirportServiceImpl implements IAirportService {
  @Autowired
  private AirportRepository airportRepo;
  
  @Override
  public Airport addNewAirport(Airport airport) {
	return airportRepo.save(airport);
  }

  @Override
  public String deleteAirport(int airportId) {
	airportRepo.deleteById(airportId);
	return "Airport deleted for Id = " + airportId;
  }

  @Override
  public Airport findAirportById(int airportId) {
	return airportRepo.findById(airportId).orElseThrow(() -> new UserHandlingException("airport Id is invalid"));
	 
  }

}
