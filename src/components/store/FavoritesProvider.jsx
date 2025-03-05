import { useState } from "react";
import { FavoritesContext } from "./FavoritesContext";

export function FavoritesProvider({ children }) {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <FavoritesContext.Provider value={{ showFavorites, setShowFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}
