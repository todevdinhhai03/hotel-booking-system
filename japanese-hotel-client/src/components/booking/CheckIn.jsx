import { useEffect, useState } from "react"
import RoomCarousel from "../common/RoomCarousel"
import { getRoomById } from "../utils/ApiFunctions"
import BookingForm from "./BookingForm"
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from "react-icons/fa"
import { useParams } from "react-router-dom"

const CheckIn = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [roomInfo, setRoomInfo] = useState({
        roomType: "",
        roomPrice: "",
        roomPhoto: null
    })

    const { roomId } = useParams()

    useEffect(() => {
        setTimeout(() => {
            getRoomById(roomId)
                .then((response) => {
                    if (response.status == 200) {
                        setRoomInfo(response.data)
                        setIsLoading(false)
                    } else {
                        setErrorMessage("Unexpected response status: " + response.status)
                        setIsLoading(false)
                    }
                })
                .catch((error) => {
                    setErrorMessage(error.message)
                    setIsLoading(false)
                })
        }, 1000)
    }, [roomId])

    return (
        <section>
            <div className="container">
                <div className="row" id="header-checkout">
                    <div className="col-md-4 mt-5 mb-5">
                        {isLoading ? (
                            <p>Loading room information...</p>
                        ) : errorMessage ? (
                            <p>{errorMessage}</p>
                        ) : (
                            <div className="room-info">
                                <img
                                    src={`data:image/png;base64,${roomInfo.roomPhoto}`}
                                    alt="Room photo"
                                    style={{ width: "100%", height: "200px" }}
                                />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Room Type:</th>
                                            <td>
                                                <span className="hotel-color-b">{roomInfo.roomType}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Price per night:</th>
                                            <td>
                                                <span className="room-price-b">${roomInfo.roomPrice}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Room Service:</th>
                                            <td>
                                                <ul className="list-unstyled">
                                                    <li>
                                                        <FaWifi /> Wifi
                                                    </li>
                                                    <li>
                                                        <FaTv /> Netfilx Premium
                                                    </li>
                                                    <li>
                                                        <FaUtensils /> Breakfast
                                                    </li>
                                                    <li>
                                                        <FaWineGlassAlt /> Mini bar refreshment
                                                    </li>
                                                    <li>
                                                        <FaCar /> Car Service
                                                    </li>
                                                    <li>
                                                        <FaParking /> Parking Space
                                                    </li>
                                                    <li>
                                                        <FaTshirt /> Laundry
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="col-md-8">
                        <BookingForm />
                    </div>
                </div>
            </div>
            <div className="container">
                <RoomCarousel />
            </div>
        </section>
    )
}

export default CheckIn