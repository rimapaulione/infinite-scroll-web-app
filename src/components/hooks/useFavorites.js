import { useCallback, useEffect, useState } from "react";
import { getFavourites } from "../../utils/helpers";

export function useFavorites() {
  const [favorites, setFavourites] = useState(getFavourites);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((imageId) => {
    setFavourites((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  }, []);
  return { favorites, toggleFavorite };
}
