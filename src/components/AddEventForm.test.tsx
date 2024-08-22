// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import AddEventForm from './AddEventForm';
// import reducer from '../store/eventSlice'; 
// import { describe, it, expect, vi } from 'vitest';
// import userEvent from '@testing-library/user-event';
// import axios from 'axios';
// import EventList from '../components/EventList'; // Adjust the path if needed
// import { FB_BASE_URL } from '../utility/constants'; 


// // Create a mock store
// const store = createStore(reducer);
// vi.mock('axios');

// const renderWithProviders = (ui: React.ReactElement) => {
//   return render(<Provider store={store}>{ui}</Provider>);
// };

// describe('EventForm Validation', () => {
//   it('should display required error when submitting an empty form', async () => {
//     renderWithProviders(<AddEventForm />);

//     fireEvent.submit(screen.getByRole('button', { name: /Add Event/i }));

//     expect(await screen.findByText(/Event name is required/i)).toBeInTheDocument();
//     expect(await screen.findByText(/Date is required/i)).toBeInTheDocument();
//     expect(await screen.findByText(/Location is required/i)).toBeInTheDocument();
//     expect(await screen.findByText(/Description is required/i)).toBeInTheDocument();
//     expect(await screen.findByText(/Capacity is required/i)).toBeInTheDocument();
//   });

//   // it('submits form with valid data', async () => {
//   //   // Mock function for fetchEvents
//   //   const fetchEvents = vi.fn();

//   //   render(
//   //     <Provider store={store}>
//   //       <AddEventForm fetchEvents={fetchEvents} />
//   //     </Provider>
//   //   );

//   //   // Simulate user input
//   //   await userEvent.type(screen.getByPlaceholderText('Enter event name'), 'Sample Event');
//   //   await userEvent.type(screen.getByPlaceholderText('Select date'), '2023-12-31T12:00');
//   //   await userEvent.type(screen.getByPlaceholderText('Enter location'), 'Sample Location');
//   //   await userEvent.type(screen.getByPlaceholderText('Enter Description'), 'Sample Description');
//   //   await userEvent.type(screen.getByPlaceholderText('Enter Capacity'), '100');

//   //   // Simulate form submission
//   //   fireEvent.submit(screen.getByRole('button', { name: /Add Event/i }));

//   //   // Assert that fetchEvents was called
//   //   expect(screen.getByPlaceholderText('Enter event name')).toBeInTheDocument()

//   // });

// });

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store"; // Adjust the import path as necessary
import AddEventForm from "../components/AddEventForm";
import axios from "axios";
import { describe, it, expect, vi } from 'vitest';
import { FB_BASE_URL } from "../utility/constants";

// Spy on axios.post
vi.spyOn(axios, 'post');

const axiosPostMock = axios.post as jest.Mock;

// Mock fetchEvents function
const fetchEvents = vi.fn();

describe("AddEventForm", () => {
  beforeEach(() => {
    fetchEvents.mockClear();
    axiosPostMock.mockClear(); // Clear the axios.post mock
    vi.clearAllMocks(); // Clear all mocks before each test
  });

  it("renders form fields correctly", () => {
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

  it("shows validation errors if fields are left empty", async () => {
    render(
      <Provider store={store}>
        <AddEventForm fetchEvents={fetchEvents} />
      </Provider>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Add Event/i }));

    await waitFor(() => {
      expect(screen.getByText(/Event name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
    });
  });
  

  it('submits the form correctly', async () => {
    axiosPostMock.mockResolvedValue({ data: { success: true } });

    render(
      <Provider store={store}>
        <AddEventForm fetchEvents={fetchEvents} />
      </Provider>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Enter event name'), {
      target: { value: 'Test Event' },
    });
    fireEvent.change(screen.getByPlaceholderText('Select date'), {
      target: { value: '2024-09-01' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter location'), {
      target: { value: 'Test Location' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Capacity'), {
      target: { value: '100' },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /Add Event/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        FB_BASE_URL, 
        {
          event: "Test Event",
          date: "2024-09-01",
          location: "Test Location",
          description: "Test Description",
          capacity: "100",
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(fetchEvents).toHaveBeenCalled();
    });
    
  });
    
  });




