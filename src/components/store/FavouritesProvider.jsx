import { useState } from 'react';
import { FavouritesContext } from './FavouritesContext';

export function FavouritesProvider({ children }) {
  const [showFavourites, setShowFavourites] = useState(false);

  return (
    <FavouritesContext.Provider value={{ showFavourites, setShowFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
}
