package com.example.japanese_hotel_server.repository;

import com.example.japanese_hotel_server.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IRoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String roleUser);

    boolean existsByName(String name);
}
