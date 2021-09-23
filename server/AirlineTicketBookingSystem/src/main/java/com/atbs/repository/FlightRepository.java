package com.atbs.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.atbs.model.Airport;
import com.atbs.model.Flight;

public interface FlightRepository extends JpaRepository<Flight, Integer> {
  @Query("select f from Flight f where f.departureAirport=:departureAirport and f.arrivalAirport=:arrivalAirport and date(f.departureTime)=:departureTime")
	List<Flight> findFlights(@Param("departureAirport") Airport from,@Param("arrivalAirport") Airport to, @Param("departureTime") Date departureTime);
}
