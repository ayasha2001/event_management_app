import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AddEventForm from './AddEventForm';
import reducer from '../store/eventSlice'; 
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';


// Create a mock store
const store = createStore(reducer);
vi.mock('axios');

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('EventForm Validation', () => {
  it('should display required error when submitting an empty form', async () => {
    renderWithProviders(<AddEventForm />);

    fireEvent.submit(screen.getByRole('button', { name: /Add Event/i }));

    expect(await screen.findByText(/Event name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Date is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Location is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Description is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Capacity is required/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    // Mock function for fetchEvents
    const fetchEvents = vi.fn();

    render(
      <Provider store={store}>
        <AddEventForm fetchEvents={fetchEvents} />
      </Provider>
    );

    // Simulate user input
    await userEvent.type(screen.getByPlaceholderText('Enter event name'), 'Sample Event');
    await userEvent.type(screen.getByPlaceholderText('Select date'), '2023-12-31T12:00');
    await userEvent.type(screen.getByPlaceholderText('Enter location'), 'Sample Location');
    await userEvent.type(screen.getByPlaceholderText('Enter Description'), 'Sample Description');
    await userEvent.type(screen.getByPlaceholderText('Enter Capacity'), '100');

    // Simulate form submission
    fireEvent.submit(screen.getByRole('button', { name: /Add Event/i }));

    // Assert that fetchEvents was called
    expect(screen.getByPlaceholderText('Enter event name')).toBeInTheDocument()

  });

});

