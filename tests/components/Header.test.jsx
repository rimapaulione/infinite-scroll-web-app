import { render, screen, fireEvent } from '@testing-library/react';
import { FavouritesProvider } from '../../src/components/store/FavouritesProvider';
import Header from '../../src/components/UI/Header';

describe('Header Component - button', () => {
  it('shows correct button text based on showFavourites state and toggles on click', () => {
    render(
      <FavouritesProvider>
        <Header />
      </FavouritesProvider>,
    );
    screen.debug();

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Show favourites');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Show all photos');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Show favourites');
  });
});
