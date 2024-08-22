// Base Imports
import React, { useEffect, useState } from "react";

// Package Imports
import axios from "axios";

// Component Imports
import AddEventForm from "../components/AddEventForm";
import EventList from "../components/EventList";
import ConfirmDeleteModal from "../utility/ConfirmDeleteModal";
import ViewDetailModal from "../components/ViewDetailModal";

// Other Imports
import { FB_BASE_URL, FB_UPDATE_URL } from "../utility/constants";
import { EVENT_LIST_TITLE_TEXT } from "../utility/textVariables";

const Event = () => {

  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
  const [isFetchingEvents, setIsFetchingEvents] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [viewDetail, setViewDetail] = useState(false)

  useEffect(() => {
    fetchEvents()
  },[]);

  const fetchEvents = async () => {
    try {
      setIsFetchingEvents(true)
      const response = await axios.get(FB_BASE_URL);
      const data = response?.data;
      // Transforming the data into an array of events with ids
      const fetchedEvents = Object.keys(data)?.map((key) => ({
        id: key,
        ...data[key],
      }));
      
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsFetchingEvents(false)
    }
  };

  const handleEditClick = (event: any) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll
    });
    setSelectedEvent(event);
  };

  const handleDeleteClick = (eventId: string) => {
    setEventToDelete(eventId);
    setIsDeleteConfirmationModalOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      try {
        await axios.delete(`${FB_UPDATE_URL}/${eventToDelete}.json`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
    setIsDeleteConfirmationModalOpen(false);
    setEventToDelete(null);
    setSelectedEvent(null);
  };

  const handleCloseDeleteConfirmationModal = () => {
    setIsDeleteConfirmationModalOpen(false);
    setEventToDelete(null);
  };

  return (
    <div>
      <AddEventForm fetchEvents={fetchEvents} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}/>
      <h2 className="text-center text-[36px] sm:text-[40px] my-10 sm:my-0 sm:mb-10 uppercase font-bold text-gray-900">{EVENT_LIST_TITLE_TEXT}</h2>
      <EventList events={events} isFetchingEvents={isFetchingEvents} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} setSelectedEvent={setSelectedEvent} setViewDetail={setViewDetail}/>
      <ConfirmDeleteModal
        isOpen={isDeleteConfirmationModalOpen}
        onClose={handleCloseDeleteConfirmationModal}
        onConfirm={handleConfirmDelete}
        itemName={events?.find(event => event?.id === eventToDelete)?.event || "Event"}
      />
      <ViewDetailModal event={selectedEvent} isOpen={viewDetail} setIsOpen={setViewDetail} />
    </div>
  );
};

export default Event;
