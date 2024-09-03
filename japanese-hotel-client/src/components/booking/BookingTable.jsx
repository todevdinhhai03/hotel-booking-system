import { useEffect, useState } from "react";
import DateSlider from "../common/DateSlider";
import { parseISO } from "date-fns"

const BookingTable = ({ bookings, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState(bookings)

    const filterBookings = (startDate, endDate) => {
        let filtered = bookings
        if (startDate && endDate) {
            filtered = bookings.filter((booking) => {
                const bookingStarDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return (
                    bookingStarDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
                )
            })
        }
        setFilteredBookings(filtered)
    }

    useEffect(() => {
        setFilteredBookings(bookings)
    }, [bookings])

    return (
        <section className="p-4">
            <DateSlider onDateChange={filterBookings} />
            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking ID</th>
                        <th>Room ID</th>
                        <th>Room Type</th>
                        <th>Check-In Date</th>
                        <th>Check-Out Date</th>
                        <th>Guest Name</th>
                        <th>Guest Email</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Total Guest</th>
                        <th>Confirmation Code</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {filteredBookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{booking.bookingId}</td>
                            <td>{booking.room.roomId}</td>
                            <td>{booking.room.roomType}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.guestName}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalNumOfGuests}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleBookingCancellation(booking.bookingId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredBookings.length === 0 && <p> No booking found for the selected dates</p>}
        </section>
    )
}

export default BookingTable;