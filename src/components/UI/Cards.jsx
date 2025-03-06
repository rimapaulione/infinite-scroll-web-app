import { useCallback, useContext, useMemo, useRef } from 'react';
import { useFetchImages } from '../hooks/useFetchImages';
import { useFavorites } from '../hooks/useFavorites';
import { FavoritesContext } from '../store/FavoritesContext';
import Button from './Button';
import CardItem from './CardItem';
import styles from './Cards.module.scss';
import Error from './Error';
import Message from './Message';

function Cards() {
  const { images, isLoading, error, loadMore } = useFetchImages();
  const { showFavorites } = useContext(FavoritesContext);
  const { favorites, toggleFavorite } = useFavorites();

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
    [isLoading, loadMore, error],
  );

  const content = useMemo(
    () => (showFavorites ? favorites : images),
    [showFavorites, favorites, images],
  );

  if (showFavorites && favorites.length === 0) {
    return (
      <Message>
        <Button href="/"> Find your favorite photos</Button>{' '}
      </Message>
    );
  }
  return (
    <>
      <ul className={styles.cards}>
        {content.map((image, index) => (
          <CardItem
            key={image.id}
            ref={content.length - 1 === index ? lastImage : null}
            image={image}
            isFavorite={favorites.some((fav) => fav.id === image.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </ul>

      {!error && !showFavorites && (
        <Button
          isCenter={true}
          onClick={() => {
            loadMore();
          }}
        >
          {isLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}

      {error && !showFavorites && (
        <Error message={error}>
          <Button
            onClick={() => {
              loadMore();
            }}
          >
            Retry
          </Button>
        </Error>
      )}
    </>
  );
}

export default Cards;
