package com.example.japanese_hotel_server.service;

import com.example.japanese_hotel_server.model.Booking;

import java.util.List;

public interface IBookingService {
    List<Booking> getAllBookings();
    String createBooking(Long roomId, Booking booking);

    void cancelBooking(Long bookingId);

    Booking getBookingByConfirmationCode(String confirmationCode);

    List<Booking> getBookingsByUserEmail(String email);
}
