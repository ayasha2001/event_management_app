// Base Imports
import React from 'react'

// Other Imports
import { CAPACITY_TITLE_TEXT } from '../utility/textVariables'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { updateDateFormat } from '../utility/utils'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../store/modalSlice'

const ViewDetailModal = () => {
  const dispatch = useDispatch();
  const { data:event, isOpen } = useSelector((state:any)=>state.modal.modal)

   return isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"> 
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-4">
        <h2 className="text-3xl font-bold">{event?.event}</h2>
        <p className="font-light text-gray-500 text-sm">{updateDateFormat(event?.date)}</p>
        <hr className='w-full h-1 my-4'></hr>
        <p className="text-lg align-center my-4">{event?.description}</p>
        <p className="">{event?.location}</p>
        <p className="text-emerald-600 font-bold text-left uppercase">{CAPACITY_TITLE_TEXT}: {event?.capacity}</p>
        <XMarkIcon onClick={() => {dispatch(closeModal())}} className='absolute right-4 top-4 h-6 w-6 cursor-pointer hover:opacity-50' />
      </div>
    </div>
  )
}

export default ViewDetailModal