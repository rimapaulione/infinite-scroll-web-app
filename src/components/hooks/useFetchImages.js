import { useEffect, useState } from "react";

const URL = "https://api.pexels.com/v1/search?query=nature";
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export function useFetchImages(perPage = 12) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(
    function () {
      async function fetchImages() {
        try {
          setIsLoading(true);
          setError(null);

          const response = await fetch(
            `${URL}&page=${currentPage}&per_page=${perPage}`,
            {
              headers: { Authorization: API_KEY },
            }
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
      }
      fetchImages();
    },
    [currentPage, perPage]
  );

  const loadMore = () => setCurrentPage((prevPage) => prevPage + 1);
  return { images, isLoading, error, loadMore };
}
