import { getRooms } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"
import { useEffect, useState } from "react"

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([{ roomId: "", roomType: "", roomPrice: "", roomPhoto: "" }])
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getRooms()
            .then((response) => {
                if (response.status == 200) {
                    setRooms(response.data)
                    setIsLoading(false)
                } else {
                    setErrorMessage("Unexpected response status: " + response.status)
                }
            })
            .catch((error) => {
                setErrorMessage(error.message)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <div className="mt-5">Loading rooms....</div>
    }
    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>
    }

    const handleClick = () => {
        document.getElementById("header-checkout").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="bg-light mb-5 mt-5 shadow-lg">
            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.roomId} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/bookings/${room.roomId}`} onClick={handleClick}>
                                                <Card.Img
                                                    variant="top"
                                                    src={`data:image/png;base64, ${room.roomPhoto}`}
                                                    alt="Room Photo"
                                                    className="w-100"
                                                    style={{ height: "200px" }}
                                                />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title className="hotel-color">{room.roomType}</Card.Title>
                                                <Card.Title className="room-price">¥{room.roomPrice}/日</Card.Title>
                                                <div className="flex-shrink-0">
                                                    <Link to={`/bookings/${room.roomId}`} className="btn btn-hotel btn-sm" onClick={handleClick}>
                                                        すぐ予約
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    )
}

export default RoomCarousel
