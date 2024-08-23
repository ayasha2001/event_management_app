import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { describe, it, expect, vi } from 'vitest';
import EventList from './EventList';
import reducer from '../store/eventSlice'; 

// Create a mock store
const store = createStore(reducer);

describe('EventList Component', () => {

  it('displays no events message when there are no events', () => {
    // Set up the store to indicate no events are available
    const mockStore = createStore((state = { events: { isFetchingEvents: false, events: [] } }) => state);

    render(
      <Provider store={mockStore}>
        <EventList />
      </Provider>
    );

    expect(screen.getByAltText('no-record-found')).toBeInTheDocument();
    expect(screen.getByText('Uh! Oh! No events Found.')).toBeInTheDocument();
  });

  it('renders event cards when events are available', async () => {
    
    const mockEvents = [
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' }
    ];

    // mock store
    const mockStore = createStore((state = { events: { isFetchingEvents: false, events: mockEvents } }) => state);

    render(
      <Provider store={mockStore}>
        <EventList />
      </Provider>
    );

    // Check that EventCard components are rendered for each event
    expect(screen.queryByAltText('no-record-found')).toBeNull();
   
  });
});
