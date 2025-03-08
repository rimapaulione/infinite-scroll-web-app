import { render, screen, act } from '@testing-library/react';
import { useFavourites } from '../../src/components/hooks/useFavourites';
import { useFetchImages } from '../../src/components/hooks/useFetchImages';
import { FavouritesContext } from '../../src/components/store/FavouritesContext';
import Cards from '../../src/components/UI/Cards';
import { expect } from 'vitest';

vi.mock('../../src/components/hooks/useFetchImages', () => ({
  useFetchImages: vi.fn(),
}));

vi.mock('../../src/components/hooks/useFavourites', () => ({
  useFavourites: vi.fn(),
}));

describe('Cards Component - Favourites', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useFavourites.mockReturnValue({
      favourites: [
        { id: 1, src: { tiny: 'url1' }, alt: 'Nature Photo 1' },
        { id: 2, src: { tiny: 'url2' }, alt: 'Nature Photo 2' },
      ],
      toggleFavourite: vi.fn(),
    });

    useFetchImages.mockReturnValue({
      images: [
        { id: 1, src: { tiny: 'url1' }, alt: 'Nature Photo 1' },
        { id: 2, src: { tiny: 'url2' }, alt: 'Nature Photo 2' },
      ],
      isLoading: false,
      error: null,
      loadMore: vi.fn(),
    });
  });
  it('shows the favourite list when there are favourites', async () => {
    await act(async () => {
      render(
        <FavouritesContext.Provider
          value={{ showFavourites: true, setShowFavourites: vi.fn() }}
        >
          <Cards />
        </FavouritesContext.Provider>,
      );
    });
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
  it('shows the img and heading with No Favourites when are not favourites', async () => {
    useFavourites.mockReturnValue({
      favourites: [],
      toggleFavourite: vi.fn(),
    });

    await act(async () => {
      render(
        <FavouritesContext.Provider
          value={{ showFavourites: true, setShowFavourites: vi.fn() }}
        >
          <Cards />
        </FavouritesContext.Provider>,
      );
    });

    expect(screen.getByText('No Favourites')).toBeInTheDocument();
    expect(screen.getByAltText('No favourite images')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Find your favourite photos/i }),
    ).toBeInTheDocument();
  });
  it('shows two images from useFetchImages', async () => {
    await act(async () => {
      render(
        <FavouritesContext.Provider
          value={{ showFavourites: false, setShowFavourites: vi.fn() }}
        >
          <Cards />
        </FavouritesContext.Provider>,
      );
    });

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'Nature Photo 1');
    expect(images[1]).toHaveAttribute('alt', 'Nature Photo 2');
  });
  it('shows Loading when isLoading is true', async () => {
    useFetchImages.mockReturnValue({
      images: [],
      isLoading: true,
      error: null,
      loadMore: vi.fn(),
    });

    render(
      <FavouritesContext.Provider value={{ showFavourites: false }}>
        <Cards />
      </FavouritesContext.Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('shows error message when error exists', async () => {
    useFetchImages.mockReturnValue({
      images: [],
      isLoading: false,
      error: 'Failed to load images',
      loadMore: vi.fn(),
    });

    render(
      <FavouritesContext.Provider value={{ showFavourites: false }}>
        <Cards />
      </FavouritesContext.Provider>,
    );

    expect(screen.getByText('Failed to load images')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  //TODO: test infinite scroll
});
