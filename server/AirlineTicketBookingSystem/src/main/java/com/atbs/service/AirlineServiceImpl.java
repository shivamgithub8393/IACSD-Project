package com.atbs.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atbs.custom_exception.UserHandlingException;
import com.atbs.model.Airline;
import com.atbs.repository.AirlineRepository;

@Service
@Transactional
public class AirlineServiceImpl implements IAirlineService {
  @Autowired
  private AirlineRepository airlineRepo;
  
  @Override
  public Airline addNewAirLine(Airline airline) {
	return airlineRepo.save(airline);
  }

  @Override
  public String deleteAirline(int airlineId) {
	airlineRepo.deleteById(airlineId);
	return "Airline deleted for Id = " + airlineId;
  }

  @Override
  public Airline findAirline(int airlineId) {
	return airlineRepo.findById(airlineId).orElseThrow(() -> new UserHandlingException("airline Id is invalid"));
  }

  @Override
  public List<Airline> getAllAirlines() {
	return airlineRepo.findAll();
  }

}
