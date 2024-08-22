import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  isFetchingEvents: false,
  selectedEvent: null,
  eventToDelete: null
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setIsFetchingEvents: (state, action) => {
      state.isFetchingEvents = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    setEventToDelete: (state, action) => {
      state.eventToDelete = action.payload
    }
  },
});

// Export the setEvents action
export const { setEvents,setIsFetchingEvents,setSelectedEvent,setEventToDelete } = eventsSlice.actions;

// Export the reducer
export default eventsSlice.reducer;
