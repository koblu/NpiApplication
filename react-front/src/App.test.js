import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

test('renders', () => {
  render(<App />);
  const title = screen.getByText(/NPPES NPI Database Search Tool/i);
  expect(title).toBeInTheDocument();
});

test('renders search form', () => {
  render(<App />);
  const npiNumber = screen.getByLabelText(/NPI Number/i);
  expect(npiNumber).toBeInTheDocument();
  const firstName = screen.getByLabelText(/First Name/i);
  expect(firstName).toBeInTheDocument();
  const lastName = screen.getByLabelText(/Last Name/i);
  expect(lastName).toBeInTheDocument();
  const city = screen.getByLabelText(/City/i);
  expect(city).toBeInTheDocument();
  const state = screen.getByLabelText(/State/i);
  expect(state).toBeInTheDocument();
});