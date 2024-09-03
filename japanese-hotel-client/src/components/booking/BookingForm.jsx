import { useEffect } from "react"
import { useState } from "react"
import { Form, FormControl, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"

import BookingSummary from "./BookingSummary"
import { createBooking, getRoomById } from "../utils/ApiFunctions"


const BookingForm = () => {
    const [validated, setValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)

    const currentUser = localStorage.getItem("userId")

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: ""
    })

    const { roomId } = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBooking({ ...booking, [name]: value })
        setErrorMessage("")
    }

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId)
            if (response.status = 200) {
                setRoomPrice(response.data.roomPrice)
            } else {
                console.error("Unexpected response status: " + response.status)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate, "days")
        const paymentPerDay = roomPrice ? roomPrice : 0
        return diffInDays * paymentPerDay
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults)
        const childrenCount = parseInt(booking.numOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must be after check-in date")
            return false
        } else {
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
        }
        setValidated(true)
    }

    const handleFormSubmit = async () => {
        try {
            const response = await createBooking(roomId, booking)
            if (response.status == 201) {
                setIsSubmitted(true)
                navigate("/bookings/confirm", { state: { confirmationCode: response.data } })
            } else {
                throw new Error(response.data)
            }
        } catch (error) {
            console.error(error)
            navigate("/bookings/confirm", { state: { error: error.message } })
        }
    }

    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body mt-5">
                            <h4 className="card-title text-center">
                                予約
                            </h4>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="guestFullName" className="hotel-color">
                                        フルネーム
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type="text"
                                        id="guestFullName"
                                        name="guestFullName"
                                        value={booking.guestFullName}
                                        placeholder="フルネームを入力する"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        フルネームを入力してください
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="guestEmail" className="hotel-color">
                                        メール
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        有効なメールアドレスを入力してください
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset className="mb-3">
                                    <legend>宿泊期間</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="checkInDate" className="hotel-color">
                                                チェックイン日
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkInDate"
                                                name="checkInDate"
                                                value={booking.checkInDate}
                                                placeholder="check-in-date"
                                                min={moment().format("MMM Do, YYYY")}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                チェックイン日を選択してください
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="checkOutDate" className="hotel-color">
                                                チェックアウト日
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkOutDate"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                placeholder="check-out-date"
                                                min={moment().format("MMM Do, YYYY")}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                チェックアウト日を選択してください
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                    </div>
                                </fieldset>

                                <fieldset className="mb-3">
                                    <legend>ゲスト人数</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfAdults" className="hotel-color">
                                                大人
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfAdults"
                                                name="numOfAdults"
                                                value={booking.numOfAdults}
                                                min={1}
                                                placeholder="1"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                大人1名以上を選択してください
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfChildren" className="hotel-color">
                                                Children
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfChildren"
                                                name="numOfChildren"
                                                value={booking.numOfChildren}
                                                placeholder="0"
                                                min={0}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                同行する子供がいない場合は0を選択してください
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="fom-group mt-2 mb-2">
                                    <button type="submit" className="btn btn-hotel">
                                        次
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="col-md-4">
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                onConfirm={handleFormSubmit}
                                isFormValid={validated}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default BookingForm
