import { useState } from 'react';

const RoomFilter = ({data, setFilteredData}) => {
    const [filter, setFilter] = useState("");

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType);
        const filteredRooms = data.filter((room) =>
            room.roomType.toLowerCase()
                .includes(selectedRoomType.toLowerCase())) 
                setFilteredData(filteredRooms)
    }
    const clearFilter = () => {
        setFilter("")
        setFilteredData(data);
    }

    const roomTypes = ["", ...new Set(
        data.map((room) => room.roomType)
    )]
  return (
    <>
          <div className="input-group mb-3 flex gap-24">

              <select
                  className="w-full block overflow-hidden rounded-md border border-gray-200 px-6 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  value={filter}
                  onChange={handleSelectChange}>
                  <option value={""}>
                      select a room type to filter
                  </option>
                  {
                      roomTypes.map((type, index) => (
                          <option key={index} value={String(type)}>
                              {String(type)}
                          </option>
                      ))
                    }
              </select>
              <button
                  className="inline-block shrink-0 rounded-md border
                   border-blue-300
                    bg-blue-600 px-12 py-3 text-sm font-medium
                     text-white transition hover:bg-transparent
                      hover:text-blue-600 
                      focus:outline-none focus:ring active:text-blue-500"
                  type='button'
                  onClick={clearFilter}>
                  Clear Filter
              </button>
      </div>
    </>
  )
}

export default RoomFilter
