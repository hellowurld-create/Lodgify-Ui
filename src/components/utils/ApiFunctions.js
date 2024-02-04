import axios from "axios";

// Create an instance of axios for making API requests
export const api = axios.create({
    baseURL: "http://localhost:9192"
});

/**
 * Add a new room to the database.
 * @param {File} photo - The photo of the room.
 * @param {string} roomType - The type of room.
 * @param {number} roomPrice - The price of the room.
 * @returns {boolean} Indicates whether the room was added successfully.
 */
export async function addRoom(photo, roomType, roomPrice) {
    try {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("roomType", roomType);
        formData.append("roomPrice", roomPrice);

        const response = await api.post("/rooms/add/new-room", formData);
        return response.status === 201;
    } catch (error) {
        console.error("Error adding room:", error);
        return false;
    }
}

/**
 * Retrieve all room types from the database.
 * @returns {Array} An array of room types.
 * @throws {Error} Throws an error if fetching room types fails.
 */
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/room-types");
        return response.data;
    } catch (error) {
        console.error("Error fetching room types:", error);
        throw new Error("Failed to fetch room types");
    }
}

/**
 * Retrieve all rooms from the database.
 * @returns {Array} An array of rooms.
 * @throws {Error} Throws an error if fetching room types fails.
 */

export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw new Error("Failed to fetch rooms");
    }
}

/**
 * Delete a room from the database.
 * @returns {Array} An array of rooms.
 * @throws {Error} Throws an error if fetching room types fails.
 */

export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data;
    } catch (error) {
       console.error("Error deleting a room:", error);
        throw new Error(`Failed to delete room ${error.message}`); 
    }
}

/**
 * Update a room from the database.
 * @returns {Array} An array of rooms.
 * @throws {Error} Throws an error if fetching room types fails.
 */

export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);

    const response = await api.put(`/rooms/update/${roomId}`,formData);
    return response
}

/**
 * Gets a room by Id from the database.
 * @returns {Array} An array of rooms.
 * @throws {Error} Throws an error if fetching room types fails.
 */

export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        return result.data;
    } catch (error) {
        console.error("Error fetching a room:", error);
        throw new Error(`Failed to fetch room ${error.message}`); 
    }
}
