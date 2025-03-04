import { useCallback, useEffect, useState } from "react";
import { useFetchImages } from "../hooks/useFetchImages";
import Button from "./Button";
import CardItem from "./CardItem";
import styles from "./Cards.module.scss";
import Error from "./Error";

function Cards() {
  const { images, isLoading, error, loadMore } = useFetchImages();

  const getFavourities = () => {
    const stored = localStorage.getItem("favourities");
    return stored ? JSON.parse(stored) : [];
  };

  const [favourities, setFavourities] = useState(getFavourities);

  useEffect(() => {
    localStorage.setItem("favourities", JSON.stringify(favourities));
  }, [favourities]);

  const toggleFavouriteHandler = useCallback((imageId) => {
    setFavourities((prevFavourities) => {
      if (prevFavourities.includes(imageId)) {
        return prevFavourities.filter((id) => id !== imageId);
      } else {
        if (prevFavourities.some((favourity) => favourity.id === imageId)) {
          return prevFavourities;
        }
        return [...prevFavourities, imageId];
      }
    });
  }, []);

  return (
    <>
      <ul className={styles.cards}>
        {images.map((image) => (
          <CardItem
            key={image.id}
            image={image}
            onToggleFavourite={toggleFavouriteHandler}
            isFavorite={favourities.includes(image.id)}
          />
        ))}
      </ul>

      <Button
        isCenter={true}
        onClick={() => {
          loadMore();
        }}
      >
        {isLoading ? "Loading..." : "Load more"}
      </Button>

      {error && <Error message={error} />}
    </>
  );
}

export default Cards;
