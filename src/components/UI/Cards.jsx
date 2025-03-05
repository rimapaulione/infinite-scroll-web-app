import { useContext } from "react";
import { useFetchImages } from "../hooks/useFetchImages";
import Button from "./Layout/Button";
import CardItem from "./CardItem";
import styles from "./Cards.module.scss";
import Error from "./Message";
import { FavoritesContext } from "../store/FavoritesContext";
import { useFavorites } from "../hooks/useFavorites";
import Message from "./Message";

function Cards() {
  const { images, isLoading, error, loadMore } = useFetchImages();
  const { showFavorites } = useContext(FavoritesContext);
  const { favorites, toggleFavorite } = useFavorites();

  const content = showFavorites
    ? images.filter((image) => favorites.includes(image.id))
    : images;

  return (
    <>
      {showFavorites && content.length === 0 && (
        <Message message="You do not have favorite images!" />
      )}
      <ul className={styles.cards}>
        {content.map((image) => (
          <CardItem
            key={image.id}
            image={image}
            isFavorite={favorites.includes(image.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
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
