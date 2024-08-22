// Base Imports
import React from "react";

// Interface Imports
import { IEventCardProps } from "./interfaces/Event";

// Other Imports
import {PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { CAPACITY_TITLE_TEXT, VIEW_DETAILS_TEXT } from "../utility/textVariables";
import { updateDateFormat } from "../utility/utils";

const EventCard: React.FC<IEventCardProps> = ({
  event,
  onEditClick=()=>{},
  onDeleteClick, 
  setViewDetail,
  setSelectedEvent,
}) => {
  
  const dateFormat = updateDateFormat(event?.date)

  const onClick = () => {
    setViewDetail(true)
    setSelectedEvent(event)
  }

  return (
    <>
    <div className="relative flex flex-col items-center border-gray-500 rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold">{event?.event}</h2>
      <p className="font-light text-gray-500 text-sm">{dateFormat}</p>
      <p className="text-lg align-center line-clamp-3 my-4">{event?.description}</p>
      <p className="">{event?.location}</p>
      <p className="text-emerald-500 font-bold text-left uppercase">{CAPACITY_TITLE_TEXT}: {event?.capacity}</p>
      <button onClick={onClick} className="w-full bg-emerald-300 rounded h-10 uppercase font-bold my-4 hover:opacity-85">{VIEW_DETAILS_TEXT}</button>
      <div className="absolute right-4 top-2 w-4 hover:cursor-pointer" onClick={() => onEditClick(event)}><PencilSquareIcon className='w-6 h-6 hover:opacity-85 hover:scale-110'/></div>
      <div className="absolute right-4 top-10 w-4 hover:cursor-pointer "onClick={() => onDeleteClick(event?.id)}><TrashIcon className='w-6 h-6 hover:opacity-85 hover:scale-110'/></div>
    </div>
    </>
  );
};

export default EventCard;
