import React from 'react'

const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
    const pageNumbers = Array.from({ length: totalPages },
        (_, i) => i + 1)
  return (
    <nav className='rounded-b-lg border-t border-gray-200 px-4 py-2'>
          <ul className="flex justify-end gap-1 text-xs font-medium">
              {pageNumbers.map((pageNumber) => (
                  <li key={pageNumber}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 active:bg-blue-500 bg-white text-gray-900'
                       ${currentPage === pageNumber ? 'active:bg-blue-500' : ''}`}>
                      <button className='block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'
                          onClick={() => onPageChange(pageNumber)}>
                          {pageNumber}
                  </button>
                  </li>
              ))}
      </ul>
    </nav>
  )
}

export default RoomPaginator
