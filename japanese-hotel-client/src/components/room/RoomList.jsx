import { useEffect, useState } from "react"
import RoomFilter from "../common/RoomFilter"
import { getRooms } from "../utils/ApiFunctions"
import RoomCard from "./RoomCard"
import RoomPaginator from "../common/RoomPaginator"
import { Col, Container, Row } from "react-bootstrap"

const RoomList = () => {
    const [rooms, setRooms] = useState([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(6)
    const [filteredRooms, setFilteredRooms] = useState([{ id: "" }])

    useEffect(() => {
        setIsLoading(true)
        const fetchRooms = async () => {
            try {
                const response = await getRooms();
                if (response.status == 200) {
                    setRooms(response.data)
                    setFilteredRooms(response.data)
                    setIsLoading(false)
                } else {
                    setError("Unexpected response status: " + response.status)
                }
            } catch (error) {
                setError(`Error: ${error.message}`)
                setIsLoading(false)
            }
        }
        fetchRooms();
    }, [])

    if (isLoading) {
        return <div className="text-center p-5 fs-2" >Loading rooms.....</div>
    }

    if (error) {
        return <div className="text-danger p-2 fs-2">{error}</div>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage)

    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage
        const endIndex = startIndex + roomsPerPage
        return filteredRooms
            .slice(startIndex, endIndex)
            .map((room, index) => <RoomCard key={index} room={room} />)
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mt-4 mb-md-0">
                    <RoomFilter rooms={rooms} setFilteredRooms={setFilteredRooms} />
                </Col>
            </Row>

            <Row>{renderRooms()}</Row>

            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default RoomList