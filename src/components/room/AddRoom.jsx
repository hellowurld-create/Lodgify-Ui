import { useState } from 'react';
import RoomTypeSelector from '../common/RoomTypeSelector';
import { addRoom } from '../utils/ApiFunctions';

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }
        setNewRoom({ ...newRoom, [name]: value });
    };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage })
    setImagePreview(URL.createObjectURL(selectedImage))
  }

  const handleFormSubmit = (e) => { 
    e.preventDefault();
    try {
      const success = addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      if (success !== undefined) {
        setSuccessMessage("New room added successfully");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" })
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding room");
  }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }


  return (
    <>
      <section className='container mt-[120px] mb-5'>
        <div className='flex-row justify-center'>
          <div className='col-md-8 col-lg-6'>
            <h2 className='mt-5 mb-6 text-center font-bold text-2xl animated fadeIn'>Add a New Room</h2>

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

            <form className="max-w-[33rem] mx-auto" onSubmit={handleFormSubmit} >
              <div className='mb-5'>
                <label
                  htmlFor="roomType"
                    >
                <span className="text-xs font-medium text-gray-700"> Room Type </span>
                </label>
                <div> 
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={newRoom} />
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
                    value={newRoom.roomPrice}
                    onChange={handleRoomInputChange}
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
                    type='file'
                    id="photo"
                    name='photo'
                    onChange={handleImageChange}
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>

                {imagePreview && (
                  <img src={imagePreview}
                    alt='Preview Room photo'
                    style={{maxWidth: '400px', maxHeight: '400px'}}
                    className='mb-3 mt-6'
                  />
                )}
                
              </div>
              <div className='grid md-flex mt-2'>
                 <button
              className="inline-block shrink-0 rounded-md border border-blue-300 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Save a Room
            </button>
              </div>

            </form>
          </div>
        </div>
    </section>
    </>
  )
}

export default AddRoom;
