import React from "react";

const EventCard = ({ event }: any) => {
  return (
    <div className="flex flex-col items-center border-gray-500 rounded-lg shadow-md">
      <h2>{event?.name}</h2>
      <p>{new Date(event?.date).toLocaleString()}</p>
      <p>{event?.location}</p>
      <p>Capacity: {event?.capacity}</p>
      <p>{event?.description}</p>
    </div>
  );
};

export default EventCard;
