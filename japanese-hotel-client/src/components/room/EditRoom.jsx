import { useEffect, useState } from "react"
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

const EditRoom = () => {
    const [roomData, setRoomData] = useState({
        roomType: "",
        roomPrice: "",
        roomPhoto: null
    });

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { roomId } = useParams()

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await getRoomById(roomId);
                if (response.status == 200) {
                    setRoomData(response.data)
                    // xx
                    setImagePreview(`data:image/png;base64, ${response.data.roomPhoto}`)
                } else {
                    setErrorMessage("Unexpected response status: " + response.status)
                }
            } catch (error) {
                setErrorMessage("Error: " + error)
            }
        }
        fetchRoom();
    }, [])

    const handleInputChange = (e) => {
        const name = e.target.name
        let value = null
        if (name == "roomPhoto") {
            value = e.target.files[0]
            setImagePreview(URL.createObjectURL(value))
        } else {
            value = e.target.value
        }
        setRoomData({ ...roomData, [name]: value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateRoom(roomId, roomData);
            if (response.status == 200) {
                setSuccessMessage("Room updated successfully !")
                setRoomData(response.data)
                setImagePreview(`data:image/png;base64, ${response.data.roomPhoto}`)
                setErrorMessage("")
            } else {
                setErrorMessage("Unexpected response status: " + response.status)
            }
        } catch (error) {
            setErrorMessage("Error: " + error)
        }

        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    return (
        <>
            <div className="container mt-5 mb-5">
                <h3 className="text-center mb-5 mt-5">Edit Room</h3>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">

                        {errorMessage && (<div className="alert alert-danger" role="alert">{errorMessage}</div>)}
                        {successMessage && (<div className="alert alert-success" role="alert">{successMessage}</div>)}

                        <form onSubmit={handleOnSubmit}>
                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label hotel-color">
                                    Room Type
                                </label>
                                <input
                                    type="text"
                                    id="roomType"
                                    className="form-control"
                                    name="roomType"
                                    value={roomData.roomType}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label hotel-color">
                                    Room Price
                                </label>
                                <input
                                    type="number"
                                    id="roomPrice"
                                    className="form-control"
                                    name="roomPrice"
                                    min={0}
                                    value={roomData.roomPrice}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomPhoto" className="form-label hotel-color">
                                    Room Photo
                                </label>
                                <input
                                    type="file"
                                    id="roomPhoto"
                                    className="form-control"
                                    name="roomPhoto"
                                    onChange={handleInputChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Room preview"
                                        style={{ maxWidth: "400px", maxHeight: "400" }}
                                        className="mt-3"
                                    />
                                )}
                            </div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/rooms/manager"} className="btn btn-outline-info ml-5">
                                    Back
                                </Link>
                                <button type="submit" className="btn btn-outline-warning">
                                    Save Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditRoom