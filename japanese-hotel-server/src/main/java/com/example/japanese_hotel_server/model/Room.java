package com.example.japanese_hotel_server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;

@Entity
@Table(name = "rooms")
@Setter
@Getter
@NoArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "room_type")
    private String roomType;

    @Column(name = "room_price")
    private BigDecimal roomPrice;

    @Lob
    @Column(name = "room_photo")
    private Blob roomPhoto;

    @Column(name = "is_booked")
    private boolean isBooked = false;

    @OneToMany(mappedBy="room", cascade = CascadeType.ALL)
    private List<Booking> bookings;

    public void addBooking(Booking booking) {
        if(bookings != null) {
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        this.isBooked = true;
        booking.setRoom(this);
        booking.setBookingConfirmationCode(RandomStringUtils.randomNumeric(10));
    }
}
