import { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/ApiFunctions"

const RoomTypeSelector = ({ handleRoomInputChange }) => {

    const [roomTypes, setRoomTypes] = useState([]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await getRoomTypes();
                if (response.status == 200) {
                    setRoomTypes(response.data)
                } else {
                    console.log("error: " + response.status)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchRoomTypes();
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value)
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }

    return (
        <>
            <div>
                <select
                    required
                    className="form-select"
                    name="roomType"
                    id=""
                    onChange={(e) => {
                        if (e.target.value === "addNewRoomType") {
                            setShowNewRoomTypeInput(true)
                        } else {
                            handleRoomInputChange(e)
                        }
                    }}
                >
                    <option>Select a room type</option>
                    <option value={"addNewRoomType"}>Add new</option>

                    {roomTypes.map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                {showNewRoomTypeInput && (
                    <div className="mt-2">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter New Room Type"
                                value={newRoomType}
                                onChange={handleNewRoomTypeInputChange}
                            />
                            <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
                                Add
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default RoomTypeSelector