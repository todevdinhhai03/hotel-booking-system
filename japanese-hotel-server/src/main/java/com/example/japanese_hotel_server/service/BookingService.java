package com.example.japanese_hotel_server.service;

import com.example.japanese_hotel_server.exception.ResourceNotFoundException;
import com.example.japanese_hotel_server.exception.RoomNotAvailableException;
import com.example.japanese_hotel_server.model.Booking;
import com.example.japanese_hotel_server.model.Room;
import com.example.japanese_hotel_server.repository.IBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService{
    private final IBookingRepository bookingRepository;
    private final IRoomService roomService;
    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public String createBooking(Long roomId, Booking booking) {
        System.out.println(booking.toString());
        Room room = roomService.getRoomById(roomId);
        List<Booking> existingBookingsOfTheRoom = room.getBookings();
        boolean roomIsAvailable = checkRoomIsAvailable(booking, existingBookingsOfTheRoom);
        if(roomIsAvailable) {
            // bookingConfirmationCode is set in addBooking()
            room.addBooking(booking);
            bookingRepository.save(booking);
            return booking.getBookingConfirmationCode();
        } else {
            throw new RoomNotAvailableException("Room not available");
        }
    }

    @Override
    public void cancelBooking(Long bookingId) {
        if(!bookingRepository.existsById(bookingId)) {
            throw new ResourceNotFoundException("Booking not found with id " + bookingId);
        }
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public Booking getBookingByConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with confirmationCode " + confirmationCode));
    }

    @Override
    public List<Booking> getBookingsByUserEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }


    private boolean checkRoomIsAvailable(Booking booking, List<Booking> existingBookingsOfTheRoom) {
        return existingBookingsOfTheRoom.stream()
                .noneMatch(existingBooking ->
                        (booking.getCheckInDate().isBefore(existingBooking.getCheckOutDate()) && booking.getCheckOutDate().isAfter(existingBooking.getCheckInDate()))
                                || booking.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                || booking.getCheckOutDate().equals(existingBooking.getCheckInDate())
                );
    }
}

