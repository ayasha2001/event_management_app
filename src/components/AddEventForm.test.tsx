import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import AddEventForm from "./AddEventForm";
import axios from 'axios';
import { FB_BASE_URL } from "../utility/constants";

// Mock `axios`
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AddEventForm", () => {
  const mockStore = configureStore([]);
  const fetchEvents = jest.fn();
  const initialState = {
    events: [],
    isFetchingEvents: false,
    selectedEvent: null,
    eventToDelete: null
  };

  beforeEach(() => {

    fetchEvents.mockClear();
    mockedAxios.post.mockResolvedValue({data: {
      event: 'Event',
      date: '2001-06-25',
      location: 'Ayasha Birthday',
      description: 'Sample Description',
      capacity: '100'
    }}); 
  });

  it("renders form fields correctly", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <AddEventForm fetchEvents={fetchEvents} />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Enter event name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter location')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Capacity')).toBeInTheDocument();
  });

  it('should display required error when submitting an empty form', async () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <AddEventForm fetchEvents={fetchEvents} />
      </Provider>
    );

    fireEvent.submit(screen.getByRole('button', { name: /Add Event/i }));

    expect(await screen.findByText(/Event name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Date is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Location is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Description is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Capacity is required/i)).toBeInTheDocument();
  });

  it('submits the form successfully and resets the form', async () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <AddEventForm fetchEvents={fetchEvents} />
      </Provider>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Enter event name'), { target: { value: 'Event' } });
    fireEvent.change(screen.getByPlaceholderText('Select date'), { target: { value: '2001-06-25' } });
    fireEvent.change(screen.getByPlaceholderText('Enter location'), { target: { value: 'Sample Location' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Description'), { target: { value: 'Sample Description' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Capacity'), { target: { value: '100' } });

    fireEvent.click(screen.getByRole('button', { name: /Add Event/i }));
    
    await waitFor(()=>{
      expect(mockedAxios.post).toHaveBeenCalledWith({
        // method: 'POST',
        url: FB_BASE_URL,
        data: {
          event: 'Event',
          date: '2001-06-25',
          location: 'Ayasha Birthday',
          description: 'Sample Description',
          capacity: '100'
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    })

    await waitFor(() => {
      expect(fetchEvents).toHaveBeenCalled();
    });

    //form reset
    expect(screen.getByPlaceholderText('Enter event name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter location')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Capacity')).toBeInTheDocument();
  });
});
