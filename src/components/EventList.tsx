// Base Imports
import React from "react";

//Component Imports
import EventCard from "./EventCard";
import LoadingDots from "../utility/LoadingDots/LoadingDots";

// Interface Imports 
import { IEvent } from "../components/interfaces/Event";

// Other Imports
import { NO_EVENT_FOUND_TEXT } from "../utility/textVariables";
import { useSelector } from 'react-redux';


const EventList = () => {
  
  const isFetchingEvents:boolean = useSelector((state:any) => state.events.isFetchingEvents);
  const events:IEvent[] = useSelector((state:any) => state.events.events);

  if(isFetchingEvents) return <div className="flex items-center justify-center h-full w-full"><LoadingDots /></div>
  if(events?.length < 1 ) {
    return(
      <div className="flex flex-col justify-center items-center w-full">
        <img className="h-56 w-56" src="/no-records-found.jpg" alt="no-record-found" />
        <p className="uppercase font-medium mt-4">{NO_EVENT_FOUND_TEXT}</p>
      </div>
    )
   }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 /w-full /h-88 gap-4 mx-10 my-10 place-items-center">
      {events?.map((event:any) => (
          <EventCard key={event?.id} event={event}/>
      ))}
    </div>
  );
};

export default EventList;
