import { useCallback, useEffect, useState } from 'react';
import { getFavourites } from '../../utils/helpers';

export function useFavorites() {
  const [favorites, setFavourites] = useState(getFavourites);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((image) => {
    setFavourites((prev) =>
      prev.some((fav) => fav.id === image.id)
        ? prev.filter((fav) => fav.id !== image.id)
        : [...prev, image],
    );
  }, []);
  return { favorites, toggleFavorite };
}
