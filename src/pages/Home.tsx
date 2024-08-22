// Base Imports
import React, { useEffect } from "react";

// Package Imports
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setEvents,setEventToDelete,setIsFetchingEvents,setSelectedEvent } from '../store/eventSlice';

// Component Imports
import AddEventForm from "../components/AddEventForm";
import EventList from "../components/EventList";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ViewDetailModal from "../components/ViewDetailModal";
import Modal from "../components/common/Modal";

// Other Imports
import { FB_BASE_URL, FB_UPDATE_URL, ModalType } from "../utility/constants";
import { EVENT_LIST_TITLE_TEXT } from "../utility/textVariables";
import { closeModal } from "../store/modalSlice";


const Event = () => {
  const dispatch = useDispatch();
  const { isOpen, type }:any = useSelector((state:any) => state.modal.modal)
  const eventToDelete = useSelector((state:any) => state.events.eventToDelete)
    
  useEffect(() => {
    fetchEvents();
  }, [dispatch]);

  const fetchEvents = async () => {
    try {
      dispatch(setIsFetchingEvents(true))
      const response = await axios.get(FB_BASE_URL);
      const data = response.data;
      if(!data){
        dispatch(setEvents([]));
        return
      }
      const fetchedEvents = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      console.log(fetchedEvents)
      dispatch(setEvents(fetchedEvents));
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      dispatch(setIsFetchingEvents(false))
    }
  };
  
  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      try {
        await axios.delete(`${FB_UPDATE_URL}/${eventToDelete?.id}.json`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
    dispatch(closeModal())
    dispatch(setEventToDelete(null))
    dispatch(setSelectedEvent(null))
  };

  
  return (
    <div>
      <AddEventForm fetchEvents={fetchEvents}/>
      <h2 className="text-center text-[36px] sm:text-[40px] my-10 sm:my-0 sm:mb-10 uppercase font-semibold text-gray-900">{EVENT_LIST_TITLE_TEXT}</h2>
      <EventList />
      <Modal isOpen={isOpen}>
        { type === ModalType?.deleteConfModal && <ConfirmDeleteModal onConfirm={handleConfirmDelete}/>}
        { type === ModalType?.viewDetailModal &&  <ViewDetailModal /> }
      </Modal>
    </div>
  );
};

export default Event;
