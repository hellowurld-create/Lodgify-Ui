import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { getRoomById, updateRoom } from '../utils/ApiFunctions';


const EditRoom = () => {
	const [room, setRoom] = useState({
		photo: "",
		roomType: "",
		roomPrice: ""
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { roomId } = useParams()

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setRoom({ ...room, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setRoom({ ...room, [name]: value })
	}

	useEffect(() => {
		const fetchRoom = async () => {
			try {
				const roomData = await getRoomById(roomId)
				setRoom(roomData)
				setImagePreview(roomData.photo)
			} catch (error) {
				console.error(error)
			}
		}

		fetchRoom()
	}, [roomId])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateRoom(roomId, room)
			if (response.status === 200) {
				setSuccessMessage("Room updated successfully!")
				const updatedRoomData = await getRoomById(roomId)
				setRoom(updatedRoomData)
				setImagePreview(updatedRoomData.photo)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating room")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

    
  return (
    <>
      <section className='container mt-[120px] mb-5'>
        <div className='flex-row justify-center '>
           <div className='flex justify-center mx-[31rem] w-[30%] items-center mb-6'>
        <div className='mt-4'>
          <Link
            to={"/existing-rooms"}
            className="inline-block shrink-0 gap-6 rounded-md border mx-auto text-blue-600 px-4 py-2 text-sm font-medium text-black transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            <FaArrowLeft/>
            </Link>
                              
            </div>
          <h2 className=' font-bold text-2xl animated fadeIn mx-auto'>Edit Room</h2>
        </div>


           {successMessage && (
                <div className="animate-fade mx-auto mb-7 bg-green-200 border-l-4 justify-center border-green-400 rounded w-[500px] flex px-3 py-3 shadow-md">
                  <div className="flex items-center ">
                    <p className="text-green-700 font-semibold">{successMessage}</p>
                  </div>
                </div>
              )}
           {errorMessage && 
              <div className="animate-fade mx-auto mb-7 bg-red-200 border-l-4 justify-center border-red-400 rounded w-[500px] flex px-3 py-3 shadow-md">
                <div className="flex items-center">
                  <p className="text-red-700 font-semibold">{errorMessage}</p>
                </div>
              </div>
            }

            <form className="max-w-[33rem] mx-auto" onSubmit={handleSubmit} >
              <div className='mb-5'>
                <label
                  htmlFor="roomType"
                    >
                <span className="text-xs font-medium text-gray-700"> Room Type </span>
                </label>
                <div> 
                  <input
                                    type="text"
                                    id="text"
                                    placeholder="Enter a room type"
                                    className="block mt-2 w-full overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                    onChange={handleInputChange}
                                />
                </div>
              </div>

                <div className='mb-5'>
                <label
                  htmlFor="roomPrice"
                  className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                  <span className="text-xs font-medium text-gray-700"> Room Price </span>

                  <input
                    type="number"
                    id="roomPrice"
                    name='roomPrice'
                    required
                    placeholder="₦200"
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    value={room.roomPrice}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
                <div className='mb-5'>
                <label
                  htmlFor="photo"
                  className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <span className="text-xs font-medium text-gray-700"> Room Image </span>

                  <input
                   required
					type="file"
					id="photo"
					name="photo"
                    onChange={handleImageChange}
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>

                {imagePreview && (
                  <img src={`data:image/jpeg;base64,${imagePreview}`}
                    alt='Preview Room photo'
                    style={{maxWidth: '400px',borderRadius: '8px', maxHeight: '400px'}}
                    className='mb-3 mt-6'
                  />
                )}
                
              </div>
                <div className='grid gap-2 md-flex mt-2'>
                 <button
              className="inline-block shrink-0 rounded-md border border-blue-300 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Edit a Room
            </button>
              </div>

            </form>
        </div>
    </section>
    </>
  )
}

export default EditRoom
