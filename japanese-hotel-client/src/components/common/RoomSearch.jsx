import React, { useState } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import moment from "moment"
import RoomSearchResults from "./RoomSearchResult"
import RoomTypeSelector from "./RoomTypeSelector"
import { getAvailableRoomsByFilters } from "../utils/ApiFunctions"


const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (event) => {
        event.preventDefault()
        const checkInMoment = moment(searchQuery.checkInDate)
        const checkOutMoment = moment(searchQuery.checkOutDate)
        if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
            setErrorMessage("Please enter full check in and check out date!")
            return
        }
        if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
            setErrorMessage("Check-out date must be after check-in date!")
            return
        }
        setIsLoading(true)
        setErrorMessage("")
        getAvailableRoomsByFilters(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
            .then((response) => {
                setAvailableRooms(response.data)
                setTimeout(() => setIsLoading(false), 2000)
            })
            .catch((error) => {
                setErrorMessage(error.message)
                setIsLoading(false)
            })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setSearchQuery({ ...searchQuery, [name]: value })
        const checkInDate = moment(searchQuery.checkInDate)
        const checkOutDate = moment(searchQuery.checkOutDate)
        if (checkInDate.isValid() && checkOutDate.isValid()) {
            setErrorMessage("")
        }
    }
    const handleClearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: ""
        })
        setAvailableRooms([])
    }

    return (
        <>
            <Container className="shadow bg-light mt-n5 mb-5 py-5">
                <Form onSubmit={handleSearch}>
                    <Row className="justify-content-center">
                        <Col xs={12} md={3}>
                            <Form.Group controlId="checkInDate">
                                <Form.Label>Check-in Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="checkInDate"
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group controlId="checkOutDate">
                                <Form.Label>Check-out Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="checkOutDate"
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group controlId="roomType">
                                <Form.Label>Room Type</Form.Label>
                                <div className="d-flex">
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleInputChange}
                                        newRoom={searchQuery}
                                    />
                                    <Button variant="secondary" type="submit" className="ml-2">
                                        Search
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                {isLoading ? (
                    <p className="text-center fs-5 mb-0 mt-4">Finding availble rooms....</p>
                ) : availableRooms ? (
                    <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
                ) : (
                    <p className="mt-4">No rooms available for the selected dates and room type.</p>
                )}
                {errorMessage && <p className="text-danger text-center fs-5 mb-0">{errorMessage}</p>}
            </Container>
        </>
    )
}

export default RoomSearch
