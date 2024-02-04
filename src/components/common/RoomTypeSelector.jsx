import React, { useEffect, useState } from 'react';
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypesInput, setShowNewRoomTypesInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState("");

    useEffect(() => {
        getRoomTypes().then(data => {
            setRoomTypes(data);
        });
    }, []);

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    };

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType(""); // Clear the new room type input
            setShowNewRoomTypesInput(false);
            handleRoomInputChange({ target: { name: 'roomType', value: newRoomType } }); // Update newRoom.roomType
        }
    };

    return (
        <>
            {
                roomTypes.length > 0 && (
                    <div>
                        <select
                            name="roomType"
                            id="roomType"
                            value={newRoom.roomType}
                            className="w-full block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            onChange={(e) => {
                                if (e.target.value === "Add New Room") {
                                    setShowNewRoomTypesInput(true)
                                } else {
                                    handleRoomInputChange(e)
                                }
                            }}
                        >
                            <option value={""} className="font-medium text-gray-700">Select a room type</option>
                            <option value={"Add New Room"}>Add New Room</option>

                            {
                                roomTypes.map((type, index) => (
                                    <option value={type} key={index}>{type}</option>
                                ))
                            }
                        </select>
                        {showNewRoomTypesInput && (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="text"
                                    placeholder="Enter a new room type"
                                    className="block mt-2 w-full overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                    onChange={handleNewRoomTypeInputChange}
                                />
                                <button
                                    className="inline-block mt-2 ml-2 shrink-0 rounded-md border border-blue-600 bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    type="button"
                                    onClick={handleAddNewRoomType}
                                >
                                    Add
                                </button>
                            </div>
                        )}
                    </div>
                )
            }
        </>
    );
};

export default RoomTypeSelector;
