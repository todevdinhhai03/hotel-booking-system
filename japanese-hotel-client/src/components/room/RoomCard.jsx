import { useState } from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const RoomCard = ({ room }) => {
    return (
        <section className="bg-light p-2 mt-2 mb-3 shadow">
            <Col className="mb-4" xs={12}>
                <Card>
                    <Card.Body className="d-flex flex-wrap align-items-center">
                        <div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
                            <Link to={`/booking/${room.roomId}`}>
                                <Card.Img
                                    variant="top"
                                    src={`data:image/png;base64, ${room.roomPhoto}`}
                                    alt="Room Photo"
                                    style={{ width: "300px", height: "200px" }}
                                />
                            </Link>
                        </div>
                        <div className="flex-grow-1 ml-3 px-5">
                            <Card.Title className="hotel-color">{room.roomType}</Card.Title>
                            <Card.Title className="room-price">{room.roomPrice}万/日</Card.Title>
                            <Card.Text>&#x1F381;チェックイン時に10,000円プレゼント</Card.Text>

                        </div>
                        <div className="flex-shrink-0 mt-3 ">
                            <Link to={`/bookings/${room.roomId}`} className="btn btn-hotel">
                                予約する
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </section>

    )
}

export default RoomCard

