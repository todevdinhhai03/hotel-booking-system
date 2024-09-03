package com.example.japanese_hotel_server.service;

import com.example.japanese_hotel_server.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IRoomService {
    Room addRoom(String roomType, BigDecimal roomPrice, MultipartFile roomPhoto) throws IOException, SQLException;

    List<Room> getAllRooms();

    Room getRoomById(Long roomId);

    List<Room> getAvailableRoomsByFilters(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    Room update(Long roomId, String roomType, BigDecimal roomPrice, MultipartFile roomPhoto) throws IOException, SQLException;

    void delete(Long roomId);

    List<String> getAllRoomTypes();
}
