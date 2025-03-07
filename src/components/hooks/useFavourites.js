import { useCallback, useEffect, useState } from 'react';
import { getFavourites } from '../../utils/helpers';

export function useFavourites() {
  const [favourites, setFavourites] = useState(getFavourites);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = useCallback((image) => {
    setFavourites((prev) =>
      prev.some((fav) => fav.id === image.id)
        ? prev.filter((fav) => fav.id !== image.id)
        : [...prev, image],
    );
  }, []);
  return { favourites, toggleFavourite };
}
