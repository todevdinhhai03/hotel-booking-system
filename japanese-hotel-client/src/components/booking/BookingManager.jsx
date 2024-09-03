import { useEffect, useState } from "react";
import Header from "../common/Header";
import { cancelBooking, getBookings } from "../utils/ApiFunctions";
import BookingTable from "./BookingTable";
import { Link } from "react-router-dom";

const BookingManager = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchBookings()
    }, [])

    const fetchBookings = async () => {
        try {
            const response = await getBookings();
            if (response.status == 200) {
                setBookings(response.data)
                setIsLoading(false)
                setErrorMessage("")
            } else {
                setErrorMessage("Unexpected response status: " + response.status)
            }
        } catch (error) {
            setErrorMessage("Error: " + error.message)
        }
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            const response = await cancelBooking(bookingId)
            if (response.status == 204) {
                fetchBookings()
            }
            else {
                setErrorMessage("Booking deletion failed, please try again later!")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const isLoggedIn = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")

    return (
        <section style={{ backgroundColor: "whitesmoke" }}>
            <Header title={"Existing Bookings"} />

            {errorMessage && (<div className="alert alert-danger fade show"> {errorMessage}</div>)}
            {isLoading ? (
                <div>Loading existing bookings ...</div>
            ) : (
                <BookingTable
                    bookings={bookings}
                    handleBookingCancellation={handleBookingCancellation}
                />
            )}
        </section>
    )
}

export default BookingManager