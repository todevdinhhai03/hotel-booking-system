// const { default: axios } = require("axios");
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:9191"
})

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}


export async function addNewRoom(newRoom) {

    if (!newRoom.roomType || !newRoom.roomPrice || !newRoom.roomPhoto) {
        throw new Error("All fields are required");
    }

    if (!(newRoom.roomPhoto instanceof File || newRoom.roomPhoto instanceof Blob)) {
        throw new Error("roomPhoto must be a File or Blob");
    }

    newRoom.roomType = String(newRoom.roomType);
    newRoom.roomPrice = String(newRoom.roomPrice);

    const formData = new FormData();
    formData.append("roomType", newRoom.roomType);
    formData.append("roomPrice", newRoom.roomPrice);
    formData.append("roomPhoto", newRoom.roomPhoto);

    try {
        const response = await api.post("/rooms", formData)
        return response
    } catch (error) {
        throw error
    }
}

export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/types")
        return response
    } catch (error) {
        throw error
    }
}

export async function getRooms() {
    try {
        const response = await api.get("/rooms");
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteRoom(roomId) {
    try {
        const response = await api.delete(`/rooms/${roomId}`)
        return response;
    } catch (error) {
        throw error;
    }
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("roomPhoto", roomData.roomPhoto);

    try {
        const response = await api.put(`/rooms/${roomId}`, formData)
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getRoomById(roomId) {
    try {
        const response = await api.get(`/rooms/${roomId}`)
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getAvailableRoomsByFilters(checkInDate, checkOutDate, roomType) {
    try {
        const response = await api.get(`/rooms/availableByFilters?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
        return response
    } catch (error) {
        throw error;
    }
}

export async function createBooking(roomId, booking) {
    try {
        const response = await api.post(`/bookings/${roomId}`, booking)
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getBookings() {
    try {
        const response = await api.get(`/bookings`)
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const response = await api.get(`/bookings/${confirmationCode}`)
        return response;
    } catch (error) {
        throw error;
    }
}

export async function cancelBooking(bookingId) {
    try {
        const response = await api.delete(`/bookings/${bookingId}`)
        return response;
    } catch (error) {
        throw error;
    }
}

export async function registerUser(registration) {
    try {
        const response = await api.post(`/auth/register-user`, registration)
        return response;
    } catch (error) {
        throw error;
    }
}

export async function loginUser(login) {
    try {
        const response = await api.post(`/auth/login`, login)
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getUser(userId) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader()
        })
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/${userId}`, {
            headers: getHeader()
        })
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getBookingsByUserId(userId) {
    try {
        const response = await api.get(`/bookings/user/${userId}`, {
            headers: getHeader()
        })
        return response
    } catch (error) {
        throw error;
    }
}

