import { useEffect, useState } from "react";
import { deleteRoom, getRooms } from "../utils/ApiFunctions";
import { Col, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import RoomPaginator from "../common/RoomPaginator";
import { Link } from "react-router-dom";


const RoomManager = () => {
    const [rooms, setRooms] = useState([{ roomId: "", roomType: "", roomPrice: "" }])
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(8)
    const [filteredRooms, setFilteredRooms] = useState([{ roomId: "", roomType: "", roomPrice: "" }])
    const [selectedRoomType, setSelectedRoomType] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")



    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async () => {
        const response = await getRooms();
        if (response.status == 200) {
            setRooms(response.data)
            setIsLoading(false)
        }
    }

    //
    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms)
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
            setFilteredRooms(filtered)
        }
        setCurrentPage(1);
    }, [rooms, selectedRoomType])

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }

    const handlePaginationOnClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // 
    const indexOfLastRoomOnCurrentPage = currentPage * roomsPerPage
    const indexOfFirstRoomOnCurrentPage = indexOfLastRoomOnCurrentPage - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoomOnCurrentPage, indexOfLastRoomOnCurrentPage)

    // 
    const handleDelete = async (roomId) => {
        try {
            const response = await deleteRoom(roomId);
            if (response.status == 204) {
                setSuccessMessage(`Room id ${roomId} was delete!`)
                fetchRooms();
            } else {
                setErrorMessage("Unexpected response status: " + response.status)
            }
        } catch (error) {
            setErrorMessage("Error: " + error.message)
        }

        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 3000)
    }



    return (
        <>
            <h1 className="d-flex justify-content-center">既存の部屋</h1>
            {
                isLoading ? (
                    <h4 className="d-flex justify-content-center">Loadings existing rooms . . .</h4>
                ) : (
                    <section className="mt-5 mb-5 container">
                        <Link to={`/rooms/add`}>
                            <div>
                                <button className="btn btn-hotel mb-2">新しい部屋 + </button>
                            </div>
                        </Link>

                        <Row>
                            <Col md={6} className="mb-2 md-mb-0">
                                <RoomFilter rooms={rooms} setFilteredRooms={setFilteredRooms} />
                            </Col>
                            <Col>
                                {successMessage && (<div className="alert alert-success fade show"> {successMessage}</div>)}
                                {errorMessage && (<div className="alert alert-danger fade show"> {errorMessage}</div>)}
                            </Col>

                        </Row>

                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>タイプ</th>
                                    <th>価格</th>
                                    <th>アクション</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.roomId} className="text-center">
                                        <td>{room.roomId}</td>
                                        <td>{room.roomType}</td>
                                        <td>{room.roomPrice}</td>
                                        <td className="gap-2">
                                            <Link to={`/rooms/edit/${room.roomId}`}>
                                                <span className="btn btn-info btn-sm p">
                                                    <FaEye />
                                                </span>
                                                <span className="btn btn-warning btn-sm">
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(room.roomId)}>
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                            onPageChange={handlePaginationOnClick}
                        />
                    </section>
                )
            }
        </>
    )
}
export default RoomManager