package com.atbs.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.atbs.model.ERole;
import com.atbs.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	Optional<Role> findByName(ERole name);
}
