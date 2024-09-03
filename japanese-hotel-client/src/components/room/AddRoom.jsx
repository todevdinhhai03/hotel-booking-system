import { useState } from "react"
import { addNewRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from "../common/RoomTypeSelector"
import { Link } from "react-router-dom"

const AddRoom = () => {

    const [newRoom, setNewRoom] = useState({
        roomType: "",
        roomPrice: "",
        roomPhoto: null,
    })
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [imagePreview, setImagePreview] = useState("")

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = null
        if (name == "roomPhoto") {
            value = e.target.files[0]
            setImagePreview(URL.createObjectURL(value))
        } else {
            value = e.target.value
        }
        setNewRoom({ ...newRoom, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addNewRoom(newRoom);

            if (response.status == 201) {
                setSuccessMessage("Add a new room succesfuly")
                setNewRoom({ roomType: "", roomPrice: "", roomPhoto: null })
                setImagePreview("")
                setErrorMessage("")
            } else {
                setErrorMessage("Unexpected response status: " + response.status)
            }
        } catch (error) {
            console.log(newRoom)
            setErrorMessage("Error: " + error.message)
        }

        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }
    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">

                        <h2 className="mt-5 mb-2">Add a new room</h2>

                        {successMessage && (<div className="alert alert-success fade show"> {successMessage}</div>)}
                        {errorMessage && (<div className="alert alert-danger fade show"> {errorMessage}</div>)}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="roomType">
                                    Room type
                                </label>
                                <div>
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleRoomInputChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice">
                                    Room Price
                                </label>
                                <input
                                    id="roomPrice"
                                    className="form-control"
                                    name="roomPrice"
                                    required
                                    type="number"
                                    min={0}
                                    // *
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPhoto">
                                    Room photo
                                </label>
                                <input
                                    required
                                    id="roomPhoto"
                                    className="form-control"
                                    name="roomPhoto"
                                    type="file"
                                    onChange={handleRoomInputChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview room photo"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                    />
                                )}
                            </div>
                            <div>
                                <div className="d-grid gap-2 d-md-flex mt-2">
                                    <button type="submit" className="btn btn-outline-primary ml-5">
                                        Save Room
                                    </button>
                                    <Link to={"/rooms/manager"} className="btn btn-outline-info">
                                        Existing rooms
                                    </Link>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddRoom