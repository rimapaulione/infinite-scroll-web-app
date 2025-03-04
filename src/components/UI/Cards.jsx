import { useCallback, useEffect, useState } from "react";
import { useFetchImages } from "../hooks/useFetchImages";
import Button from "./Button";
import CardItem from "./CardItem";
import styles from "./Cards.module.scss";
import Error from "./Error";

function Cards() {
  const { images, loading, error, loadMore } = useFetchImages();

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

  if (error) return <Error message={error} />;

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
        {loading ? "Loading..." : "Load more"}
      </Button>
    </>
  );
}

export default Cards;
