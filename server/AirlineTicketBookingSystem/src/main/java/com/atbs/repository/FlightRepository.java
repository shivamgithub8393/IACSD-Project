package com.atbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.atbs.model.Flight;

public interface FlightRepository extends JpaRepository<Flight, Integer> {

}
