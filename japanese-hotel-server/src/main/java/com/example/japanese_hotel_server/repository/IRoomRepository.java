package com.example.japanese_hotel_server.repository;

import com.example.japanese_hotel_server.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface IRoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();

    @Query(" SELECT r FROM Room r " +
            " WHERE r.roomType LIKE %:roomType% " +
            " AND r.roomId NOT IN (" +
            "  SELECT b.room.roomId FROM Booking b " +
            "  WHERE ((b.checkInDate <= :checkOutDate) AND (b.checkOutDate >= :checkInDate))" +
            ")")
    List<Room> getAvailableRoomsByFilters(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
}
