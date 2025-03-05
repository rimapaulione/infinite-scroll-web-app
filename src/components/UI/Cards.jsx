import { useCallback, useContext, useRef } from "react";
import { useFetchImages } from "../hooks/useFetchImages";
import Button from "./Layout/Button";
import CardItem from "./CardItem";
import styles from "./Cards.module.scss";
import Error from "./Message";
import { FavoritesContext } from "../store/FavoritesContext";
import { useFavorites } from "../hooks/useFavorites";
import Message from "./Message";

//TODO: when get back from favorites to all I start scrolling from first image
//TODO: if I liked photo, but it is not in firts page, I can not see in favorites

function Cards() {
  const { images, isLoading, error, loadMore } = useFetchImages();
  const { showFavorites } = useContext(FavoritesContext);
  const { favorites, toggleFavorite } = useFavorites();
  console.log(favorites);

  const observer = useRef();
  const lastImage = useCallback(
    (node) => {
      if (isLoading || error) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, loadMore, error]
  );

  const content = showFavorites
    ? images.filter((image) => favorites.includes(image.id))
    : images;

  return (
    <>
      {showFavorites && favorites.length === 0 && (
        <Message message="You do not have favorite images!" />
      )}
      <ul className={styles.cards}>
        {content.map((image, index) => {
          if (!showFavorites && content.length === index + 1) {
            return (
              <CardItem
                ref={lastImage}
                key={image.id}
                image={image}
                isFavorite={favorites.includes(image.id)}
                toggleFavorite={toggleFavorite}
              />
            );
          }
          return (
            <CardItem
              key={image.id}
              image={image}
              isFavorite={favorites.includes(image.id)}
              toggleFavorite={toggleFavorite}
            />
          );
        })}
      </ul>

      {!showFavorites && (
        <Button
          isCenter={true}
          onClick={() => {
            loadMore();
          }}
        >
          {isLoading ? "Loading..." : error ? "Refresh" : "Load more"}
        </Button>
      )}

      {error && !showFavorites && <Message message={error} error={true} />}
    </>
  );
}

export default Cards;
