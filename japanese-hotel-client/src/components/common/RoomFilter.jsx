import { useState } from "react";

// rooms -> fiteredRoom
const RoomFilter = ({ rooms, setFilteredRooms }) => {
    // type
    const [filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value;

        setFilter(selectedRoomType);

        const filteredRooms = rooms.filter((room) =>
            room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))

        setFilteredRooms(filteredRooms)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredRooms(rooms)
    }

    // distinct
    const roomTypes = [...new Set(rooms.map((room) => room.roomType))];

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="room-type-filter">
                Filter rooms by type
            </span>

            <select
                name=""
                id=""
                className="form-select"
                value={filter}
                onChange={handleSelectChange}
            >
                <option value={""}>
                    Select a room type to filter
                </option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <button
                className="btn btn-hotel"
                type="button"
                onClick={clearFilter}>
                Clear Filter
            </button>
        </div>
    )
}

export default RoomFilter