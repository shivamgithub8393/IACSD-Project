package com.atbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.atbs.model.BookingDetails;

public interface BookingDetailsRepository extends JpaRepository<BookingDetails, Integer> {

}
