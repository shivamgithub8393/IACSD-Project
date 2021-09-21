package com.atbs.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.atbs.dto.LoginResponse;
import com.atbs.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  @Query("select new com.atbs.dto.LoginResponse(u.userEmail, u.password) from User u Where u.userEmail=:email and u.password=:password")
  Optional<LoginResponse> findByUserEmailAndPassword(@Param(value = "email") String userEmail,@Param(value = "password") String password);
  
}