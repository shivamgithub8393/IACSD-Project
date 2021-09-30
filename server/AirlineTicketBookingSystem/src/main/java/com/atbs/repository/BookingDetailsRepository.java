package com.atbs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.atbs.model.BookingDetails;

public interface BookingDetailsRepository extends JpaRepository<BookingDetails, Integer> {
  
  List<BookingDetails> findByUserId(int userId);

}
