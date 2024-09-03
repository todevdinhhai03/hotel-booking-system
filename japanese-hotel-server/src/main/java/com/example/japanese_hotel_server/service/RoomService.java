package com.example.japanese_hotel_server.service;

import com.example.japanese_hotel_server.exception.ResourceNotFoundException;
import com.example.japanese_hotel_server.model.Room;
import com.example.japanese_hotel_server.repository.IRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService{
    final private IRoomRepository roomRepository;
    @Override
    public Room addRoom(String roomType, BigDecimal roomPrice, MultipartFile roomPhoto) throws IOException, SQLException {
        Room newRoom = new Room();
        newRoom.setRoomType(roomType);
        newRoom.setRoomPrice(roomPrice);
        // MultipartFile -> Blob
        if (!roomPhoto.isEmpty()){
            byte[] photoBytes = roomPhoto.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            newRoom.setRoomPhoto(photoBlob);
        }
        return roomRepository.save(newRoom);
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id " + roomId));
    }

    @Override
    public List<Room> getAvailableRoomsByFilters(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
            return roomRepository.getAvailableRoomsByFilters(checkInDate, checkOutDate, roomType);

    }

    @Override
    public Room update(Long roomId, String roomType, BigDecimal roomPrice, MultipartFile roomPhoto) throws IOException, SQLException {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id " + roomId));

        if (roomType != null) room.setRoomType(roomType);
        if (roomPrice != null) room.setRoomPrice(roomPrice);
        if (roomPhoto != null && !roomPhoto.isEmpty()) {
            Blob photoBlob = new SerialBlob(roomPhoto.getBytes());
            room.setRoomPhoto(photoBlob);
        }
        return roomRepository.save(room);
    }

    @Override
    public void delete(Long roomId) {
        boolean exists = roomRepository.existsById(roomId);
        if (!exists) {
            throw new ResourceNotFoundException("Room not found with id " + roomId);
        }
        roomRepository.deleteById(roomId);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }
}
