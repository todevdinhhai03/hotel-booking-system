import { useState } from "react"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState("")
    const bookingEmpty = {
        bookingId: "",
        bookingConfirmationCode: "",
        room: { roomId: "", roomType: "" },
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: ""
    }
    const [booking, setBooking] = useState(bookingEmpty)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await getBookingByConfirmationCode(confirmationCode)
            if (response.status == 200) {
                setBooking(response.data)
                setIsLoading(false)
                setErrorMessage(null)
            } else {
                setErrorMessage("No booking found!")
            }
        } catch (error) {
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            const response = await cancelBooking(bookingId)
            if (response.status == 204) {
                setIsDeleted(true)
                setSuccessMessage("Booking has been cancelled successfully!")
                setBooking(bookingEmpty)
                setConfirmationCode("")
                setErrorMessage("")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center mb-4">Search Booking</h2>
                <form onSubmit={handleFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            required
                            className="form-control"
                            type="text"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            pattern="[0-9]*"
                            title="Please enter numbers only"
                        />

                        <button type="submit" className="btn btn-hotel input-group-text">
                            Search
                        </button>
                    </div>
                </form>

                {isLoading ? (
                    <div>Searching for your booking...</div>
                ) : errorMessage ? (
                    <div className="text-danger">Error: {errorMessage}</div>
                ) : booking.bookingConfirmationCode ? (
                    <div className="col-md-6 mt-4 mb-5">
                        <h3>Booking Information</h3>
                        <p className="text-success">Confirmation Code: {booking.bookingConfirmationCode}</p>
                        <p>Room Number: {booking.room.roomId}</p>
                        <p>Room Type: {booking.room.roomType}</p>
                        <p>
                            Check-in Date: {booking.checkInDate}
                        </p>
                        <p>
                            Check-out Date: {booking.checkOutDate}
                        </p>
                        <p>Full Name: {booking.guestName}</p>
                        <p>Email Address: {booking.guestEmail}</p>
                        <p>Adults: {booking.numOfAdults}</p>
                        <p>Children: {booking.numOfChildren}</p>
                        <p>Total Guest: {booking.totalNumOfGuests}</p>

                        {!isDeleted && (
                            <button
                                onClick={() => handleBookingCancellation(booking.bookingId)}
                                className="btn btn-danger">
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ) : (
                    <></>
                )}
                {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
            </div>
        </>
    )
}

export default FindBooking