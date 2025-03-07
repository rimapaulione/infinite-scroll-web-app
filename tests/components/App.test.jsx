import React from 'react';

import { render, screen } from '@testing-library/react';
import App from '../../src/App';
import { expect } from 'vitest';

test('renders header with title ', () => {
  render(<App />);
  const header = screen.getByRole('heading', { level: 1 });
  expect(header).toHaveTextContent('Frontend Homework');
});

test('renders cards ul', () => {
  render(<App />);
  const cards = screen.getByRole('list');
  expect(cards).toBeInTheDocument();
});

test('renders main', () => {
  render(<App />);
  const main = screen.getByRole('main');
  expect(main).toBeInTheDocument();
});
