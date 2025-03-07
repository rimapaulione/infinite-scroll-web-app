import { render, screen, fireEvent } from '@testing-library/react';
import CardItem from '../../src/components/UI/CardItem';
import { expect } from 'vitest';
import { useState } from 'react';

describe('CardItem Component', () => {
  it('shows list items with image', () => {
    const mockImage = {
      src: { tiny: 'url', small: 'url', medium: 'url', large: 'url' },
      alt: 'Nature Photo',
      photographer: 'John Doe',
    };
    const mockToggleFavourite = vi.fn();
    const mockIsFavourite = false;

    render(
      <CardItem
        image={mockImage}
        isFavourite={mockIsFavourite}
        toggleFavourite={mockToggleFavourite}
      />,
    );
    expect(screen.getByRole('listitem')).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockImage.src.tiny);
    expect(img).toHaveAttribute('alt', mockImage.alt);
  });
  it('shows title, photographer and button on hover ', () => {
    const mockImage = {
      src: { tiny: 'url', small: 'url', medium: 'url', large: 'url' },
      alt: 'Nature Photo',
      photographer: 'John Doe',
    };
    const mockToggleFavourite = vi.fn();
    const mockIsFavourite = false;

    render(
      <CardItem
        image={mockImage}
        isFavourite={mockIsFavourite}
        toggleFavourite={mockToggleFavourite}
      />,
    );

    const cardItem = screen.getByRole('listitem');

    fireEvent.mouseEnter(cardItem);
    expect(screen.getByText('Nature Photo')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    fireEvent.mouseLeave(cardItem);
    expect(screen.queryByText('Nature Photo')).not.toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
  it('changes button text after click Favourite ', async () => {
    const mockToggleFavourite = vi.fn();
    const image = { id: 1, src: { tiny: 'url1' }, alt: 'Nature Photo 1' };

    const { rerender } = render(
      <CardItem
        image={image}
        toggleFavourite={mockToggleFavourite}
        isFavourite={false}
      />,
    );

    const cardItem = screen.getByRole('listitem');

    fireEvent.mouseEnter(cardItem);

    const button = screen.getByText('Favourite');
    fireEvent.click(button);

    rerender(
      <CardItem
        image={image}
        toggleFavourite={mockToggleFavourite}
        isFavourite={true}
      />,
    );

    expect(screen.getByText('Unfavourite')).toBeInTheDocument();
    expect(mockToggleFavourite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavourite).toHaveBeenCalledWith(image);
  });
});
