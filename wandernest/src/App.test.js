import { render, screen } from '@testing-library/react';
import App from './App';

test('renders WanderNest brand', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/WanderNest/i)[0];
  expect(linkElement).toBeInTheDocument();
});
