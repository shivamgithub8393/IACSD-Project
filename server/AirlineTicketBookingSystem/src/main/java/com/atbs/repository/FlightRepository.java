package com.atbs.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.atbs.model.Flight;

public interface FlightRepository extends JpaRepository<Flight, Integer> {
//  @Query("select f from Flight f where f.departureAirport=:departureAirport and f.arrivalAirport=:arrivalAirport and f.DepartureTime=:departureDate")
//	List<Flight> findFlights(@Param("departureAirport") String from,@Param("arrivalAirport") String to, @Param("departureTime") LocalDate departureDate);

}
