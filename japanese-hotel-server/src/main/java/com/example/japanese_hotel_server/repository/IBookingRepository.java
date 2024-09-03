package com.example.japanese_hotel_server.repository;

import com.example.japanese_hotel_server.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IBookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByBookingConfirmationCode(String confirmationCode);

    List<Booking> findByGuestEmail(String email);
}
