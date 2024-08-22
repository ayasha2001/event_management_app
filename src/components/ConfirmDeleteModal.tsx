// Base Imports
import React from "react";

// Other Imports
import { CANCEL_TEXT,CONFIRM_DELETION_TEXT,DELETE_TEXT } from "../utility/textVariables";
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../store/modalSlice'
import { setEventToDelete } from "../store/eventSlice";

const ConfirmDeleteModal = ({onConfirm}:any) => {
  const dispatch = useDispatch();
  const { data:event, isOpen } = useSelector((state:any)=>state.modal.modal)

  const handleCloseDeleteConfirmationModal = () => {
    dispatch(closeModal());
    dispatch(setEventToDelete(null));
  };

  return isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <p className="mb-4">
         {CONFIRM_DELETION_TEXT}{event?.name}?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="bg-emerald-300 text-black hover:text-white px-4 py-2 rounded hover:bg-emerald-500"
          >
            {DELETE_TEXT}
          </button>
          <button
            onClick={handleCloseDeleteConfirmationModal}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-500 hover:text-white"
          >
            {CANCEL_TEXT}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
