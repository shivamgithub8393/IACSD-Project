package com.atbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.atbs.model.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Integer> {

}
