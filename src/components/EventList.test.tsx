import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import store from "../store/store"
import EventList from "./EventList";
import LoadingDots from "../utility/LoadingDots/LoadingDots";
import { NO_EVENT_FOUND_TEXT } from "../utility/textVariables";
import { IEvent } from "../components/interfaces/Event";

// Create a mock store
const mockStore = configureStore([]);

describe("EventList", () => {

  it("shows no events found message when there are no events", () => {
    const store = mockStore({
      events: {
        isFetchingEvents: false,
        events: []
      }
    });

    render(
      <Provider store={store}>
        <EventList />
      </Provider>
    );

    expect(screen.getByAltText(/no-record-found/i)).toBeInTheDocument();
    expect(screen.getByText(NO_EVENT_FOUND_TEXT)).toBeInTheDocument();
  });

  it("displays a list of events when events are available", () => {
    const mockEvents: IEvent[] = [
      { id: '1', event: 'Event 1', date: '2024-09-01', location: 'Location 1', description: 'Description 1', capacity: 100 },
      { id: '2', event: 'Event 2', date: '2024-09-02', location: 'Location 2', description: 'Description 2', capacity: 200 }
    ];

    const store = mockStore({
      events: {
        isFetchingEvents: false,
        events: mockEvents
      }
    });

    render(
      <Provider store={store}>
        <EventList />
      </Provider>
    );

    // Check if EventCard components are rendered
    mockEvents.forEach((event) => {
      expect(screen.getByText(event.event)).toBeInTheDocument();
    });
  });
});
