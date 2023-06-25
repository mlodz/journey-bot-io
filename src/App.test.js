import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Journey-io-bot/i);
  expect(linkElement).toBeInTheDocument();
});
