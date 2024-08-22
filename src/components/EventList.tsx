// Base Imports
import React from "react";

//Component Imports
import EventCard from "./EventCard";
import LoadingDots from "../utility/LoadingDots/LoadingDots";

// Other Imports
import { IEventListProps } from "./interfaces/Event";
import { NO_EVENT_FOUND_TEXT } from "../utility/textVariables";

const EventList: React.FC<IEventListProps> = ({events, isFetchingEvents, onEditClick,onDeleteClick, setSelectedEvent, setViewDetail}) => {
   
  if(isFetchingEvents) return <div className="flex items-center justify-center h-full w-full"><LoadingDots /></div>
  if(events?.length < 1 ) {
    return(
      <div className="flex flex-col justify-center items-center /h-screen w-full">
        <img className="h-56 w-56" src="/no-records-found.jpg" alt="no-record-found" />
        <p className="uppercase font-medium mt-4">{NO_EVENT_FOUND_TEXT}</p>
      </div>
    )
   }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-10 place-items-center">
      {events?.map((event:any) => (
          <EventCard key={event?.id} event={event} onEditClick={onEditClick} setSelectedEvent={setSelectedEvent} setViewDetail={setViewDetail} onDeleteClick={onDeleteClick}/>
      ))}
    </div>
  );
};

export default EventList;
