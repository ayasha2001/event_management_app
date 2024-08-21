// Base Imports
import React from "react";

//Component Imports
import EventCard from "./EventCard";
import {events} from "./config/addEventFormConfig"

const EventList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
