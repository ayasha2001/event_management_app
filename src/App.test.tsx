// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Header component', () => {
  render(<App />);
  const header = screen.getByText(/Event App/i);
  expect(header).toBeInTheDocument();
});
