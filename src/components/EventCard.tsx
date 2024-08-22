// Base Imports
import React from "react";

// Interface Imports
import { IEvent, IEventCardProps } from "./interfaces/Event";

// Other Imports
import {PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { CAPACITY_TITLE_TEXT, VIEW_DETAILS_TEXT } from "../utility/textVariables";
import { scrollToTop, updateDateFormat } from "../utility/utils";
import { useDispatch } from "react-redux";
import { setSelectedEvent,setEventToDelete } from "../store/eventSlice";
import { openModal } from "../store/modalSlice";
import { ModalType } from "../utility/constants";

const EventCard: React.FC<IEventCardProps> = ({event}) => {
  const dateFormat = updateDateFormat(event?.date)
  const dispatch = useDispatch()

  const handleEditClick = (event: IEvent) => {
    scrollToTop()
    dispatch(setSelectedEvent(event));
  };

  const handleDeleteClick = () => {
    dispatch(setEventToDelete(event));
    dispatch(openModal({
      type: ModalType.deleteConfModal,
      data: event
    }))
  };

  const handleViewDtl = () => {
    dispatch(openModal({
      type: ModalType.viewDetailModal,
      data: event
    }))
  }

  return (
    <>
    <div className="relative flex flex-col w-96 md:w-80 items-center border-gray-500 rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold">{event?.event}</h2>
      <p className="font-light text-gray-500 text-sm">{dateFormat}</p>
      <p className="">{event?.location}</p>
      <p className="text-emerald-500 font-bold text-left uppercase">{CAPACITY_TITLE_TEXT}: {event?.capacity}</p>
      <p className="text-lg align-center line-clamp-1 my-4">{event?.description}</p>
      <button onClick={handleViewDtl} className="w-full bg-emerald-300 rounded h-10 uppercase font-bold my-4 hover:opacity-85">{VIEW_DETAILS_TEXT}</button>
      <div className="absolute right-4 top-2 w-4 hover:cursor-pointer" onClick={() => handleEditClick(event)}><PencilSquareIcon className='w-6 h-6 hover:opacity-85 hover:scale-110'/></div>
      <div className="absolute right-4 top-10 w-4 hover:cursor-pointer "onClick={() => handleDeleteClick()}><TrashIcon className='w-6 h-6 hover:opacity-85 hover:scale-110'/></div>
    </div>
    </>
  );
};

export default EventCard;
