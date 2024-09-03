package com.example.japanese_hotel_server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "check_in_date")
    private LocalDate checkInDate;

    @Column(name = "check_out_date")
    private LocalDate checkOutDate;

    @Column(name = "guest_full_name")
    private String guestFullName;

    @Column(name = "guest_email")
    private String guestEmail;

    @Column(name = "num_of_adults")
    private int numOfAdults;

    @Column(name = "num_of_children")
    private int numOfChildren;

    @Column(name = "total_num_of_guest")
    private int totalNumOfGuest;

    @Column(name = "booking_confirmation_code")
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    public void calcTotalNumOfGuest() {
        this.totalNumOfGuest = this.numOfAdults + this.numOfChildren;
    }

    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        calcTotalNumOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        calcTotalNumOfGuest();
    }

    @Override
    public String toString() {
        return "Booking{" +
                "bookingId=" + bookingId +
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", guestFullName='" + guestFullName + '\'' +
                ", guestEmail='" + guestEmail + '\'' +
                ", numOfAdults=" + numOfAdults +
                ", numOfChildren=" + numOfChildren +
                ", totalNumOfGuest=" + totalNumOfGuest +
                ", bookingConfirmationCode='" + bookingConfirmationCode + '\'' +
                ", room=" + room +
                '}';
    }
}
