import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('App', () => {
  it('should render heading with title Frontend Homework', () => {
    render(<App />);
    const header = screen.getByRole('heading', { name: /Frontend Homework/i });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Frontend Homework');
  });
  it('renders cards ul', () => {
    render(<App />);
    const cards = screen.getByRole('list');
    expect(cards).toBeInTheDocument();
  });
  it('should render main', () => {
    render(<App />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});
