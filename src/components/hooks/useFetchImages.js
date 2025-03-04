import { useCallback, useEffect, useState } from "react";

const URL = "https://api.pexels.com/v1/search?query=nature";
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export function useFetchImages(perPage = 22) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchImages = useCallback(
    async (currentPage) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${URL}&page=${currentPage}&per_page=${perPage}`,
          { headers: { Authorization: API_KEY } }
        );

        if (!response.ok) {
          throw new Error("Something went wrong with fetching images!");
        }

        const data = await response.json();
        setImages((prevImages) => [...prevImages, ...data.photos]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [perPage]
  );

  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage, fetchImages]);

  const loadMore = useCallback(() => {
    if (!isLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  return { images, isLoading, error, loadMore };
}
