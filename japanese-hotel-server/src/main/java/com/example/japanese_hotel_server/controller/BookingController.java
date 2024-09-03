package com.example.japanese_hotel_server.controller;

import com.example.japanese_hotel_server.model.Booking;
import com.example.japanese_hotel_server.service.IBookingService;
import dto.BookingResponse;
import dto.RoomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {
    final private IBookingService bookingService;

    @PostMapping("/{roomId}")
    public ResponseEntity<String> createBooking(@PathVariable("roomId") Long roomId, @RequestBody Booking booking) {
        String confirmationCode = bookingService.createBooking(roomId, booking);
        return ResponseEntity.status(HttpStatus.CREATED).body(confirmationCode);
    }
    @GetMapping
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = bookings.stream().map(this::getBookingResponse).toList();
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/{confirmationCode}")
    public ResponseEntity<BookingResponse> getBookingByConfirmationCode(@PathVariable("confirmationCode") String confirmationCode) {
        Booking booking = bookingService.getBookingByConfirmationCode(confirmationCode);
        BookingResponse bookingResponse = this.getBookingResponse(booking);
        return ResponseEntity.ok(bookingResponse);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable("email") String email) {
        List<Booking> bookingList = bookingService.getBookingsByUserEmail(email);
        List<BookingResponse> bookingResponseList = bookingList.stream().map(this::getBookingResponse).toList();
        return ResponseEntity.ok(bookingResponseList);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> cancelBooking(@PathVariable("bookingId") Long bookingId) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private BookingResponse getBookingResponse(Booking booking) {
        //Ensure booking persistence
        RoomResponse roomResponse = new RoomResponse(
                booking.getRoom().getRoomId(),
                booking.getRoom().getRoomType(),
                booking.getRoom().getRoomPrice());
        return new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestFullName(),
                booking.getGuestEmail(),
                booking.getNumOfAdults(),
                booking.getNumOfChildren(),
                booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(),
                roomResponse);
    }
}
