package com.example.japanese_hotel_server.controller;

import com.example.japanese_hotel_server.model.Booking;
import com.example.japanese_hotel_server.model.Room;
import com.example.japanese_hotel_server.service.IBookingService;
import com.example.japanese_hotel_server.service.IRoomService;
import dto.BookingResponse;
import dto.RoomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {
    final private IRoomService roomService;
    final private IBookingService bookingService;

    @PostMapping
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice,
            @RequestParam("roomPhoto") MultipartFile roomPhoto ) throws SQLException, IOException {
        Room savedRoom = roomService.addRoom(roomType, roomPrice, roomPhoto);
        RoomResponse roomResponse = new RoomResponse(savedRoom.getRoomId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.status(HttpStatus.CREATED).body(roomResponse);
    }

    @GetMapping
    public ResponseEntity<List<RoomResponse>> getAllRooms() {
        List<Room> roomList =  roomService.getAllRooms();
        List<RoomResponse> roomResponses = roomList.stream().map(this::getRoomResponse).toList();
        return ResponseEntity.ok(roomResponses);
    }

    @GetMapping("/availableByFilters")
    public ResponseEntity<List<RoomResponse>> getAvailableRoomsByFilters(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam("roomType") String roomType) {
        List<Room> roomList =  roomService.getAvailableRoomsByFilters(checkInDate, checkOutDate, roomType);
        List<RoomResponse> roomResponses = roomList.stream().map(this::getRoomResponse).toList();
        return ResponseEntity.ok(roomResponses);
    }

    @GetMapping("/types")
    public ResponseEntity<List<String>> getAllRoomTypes() {
        List<String> roomTypes = roomService.getAllRoomTypes();
        return ResponseEntity.ok(roomTypes);
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable("roomId") Long roomId,
                           @RequestParam(value = "roomType", required = false) String roomType,
                           @RequestParam(value = "roomPrice", required = false) BigDecimal roomPrice,
                           @RequestParam(value = "roomPhoto", required = false) MultipartFile roomPhoto) throws SQLException, IOException {
        Room updatedRoom = roomService.update(roomId, roomType, roomPrice, roomPhoto);
        RoomResponse roomResponse = this.getRoomResponse(updatedRoom);
        return ResponseEntity.ok(roomResponse);
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable("roomId") Long roomId) {
        roomService.delete(roomId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable("roomId") Long roomId) {
        Room room = roomService.getRoomById(roomId);
        RoomResponse roomResponse = this.getRoomResponse(room);
        return ResponseEntity.ok(roomResponse);
    }

    private RoomResponse getRoomResponse(Room room) {
        //Ensure room persistence
        List<Booking> bookings = room.getBookings();
        List<BookingResponse> bookingResponses =  bookings.stream().map(booking -> new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getBookingConfirmationCode()
        )).toList();

        Blob photoBlob = room.getRoomPhoto();
        byte[] photoBytes = null;
        if(photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return new RoomResponse (
                room.getRoomId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                photoBytes,
                bookingResponses);
    }
}
