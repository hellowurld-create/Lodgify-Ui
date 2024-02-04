import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async() => {
        setIsLoading(true);
        try {
            const result = await getAllRooms();
            setRooms(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }


    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType)
            setFilteredRooms(filtered);
        } 
        setCurrentPage(1)
    }, [rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
            setCurrentPage(pageNumber)
    }

const handleDelete = async (roomId) => {
    try {
        const result = await deleteRoom(roomId);
        if (result === "") {
            setSuccessMessage(`Room No ${roomId} was deleted`);
            fetchRooms();
        } else {
            console.error(`Error deleting room: ${result.message}`);
        }
    } catch (error) {
        console.error("Error deleting room:", error);
        setErrorMessage(error.message);
    } finally {
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    }
};

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRoooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRoooms / roomsPerPage);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);


    

  return (
      <>
          {
              isLoading ? (
                  <div className="text-center  mt-[20rem]">
    <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading existing rooms...</span>
    </div>
    <p className='text-center'>Loading existing rooms</p>
</div>
              ) : (
                      <>
                          <section className='mt-5 mb-5 flex flex-col items-center'>
                              <div className='flex justify-center mb-3 mt-10'>
                                 <h2 className='mt-5 mb-6 text-center font-bold text-2xl animated fadeIn'>Existing Rooms</h2>
                              </div>
                              <div className='mb-3'>
                                  <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
                              </div>
                                  <div className="rounded-lg border max-w-[33rem] mx-auto border-gray-200">
                                    <div className="overflow-x-auto rounded-t-lg">
                                        <table className="divide-y-2 divide-gray-200 bg-white text-sm">
                                        <thead className="text-center">
                                            <tr>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Room Type</th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Room Price</th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
                                            </tr>
                                        </thead>

                                  <tbody className="divide-y divide-gray-200">
                                      {
                                          currentRooms.map((room) => (
                                              <tr key={room.id} className='text-center gap-2'>
                                                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{room.id}</td>
                                                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{room.roomType}</td>
                                                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{room.roomPrice}</td>
                                                  <td className='gap-4'>
                                                    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1 ">
                                                <Link
                                                    to={`/edit-room/${room.id}`}
                                                    className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                                                >
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                    />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    View/Edit
                                                </Link>

                                                <button
                                                    className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative"
                                                    onClick={() => handleDelete(room.id)}
                                                >
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                    </svg>
                                                    Delete
                                                </button>
                                                    </div>
                                                      
                                                  </td>
                                              </tr> 
                                          ))
                                      }
                                          </tbody>
                              </table>
                                          </div>
                                  <RoomPaginator
                                      className={'divide-y divide-gray-200'}
                                  currentPage={currentPage}
                                  totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                                      onPageChange={handlePaginationClick}
                                      
                                  />
                                  </div>
                      </section>
                      </>
              )
          }
      
    </>
  )
}

export default ExistingRooms
