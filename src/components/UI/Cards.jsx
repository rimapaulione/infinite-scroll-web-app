import { useCallback, useContext, useMemo, useRef } from 'react';
import { useFetchImages } from '../hooks/useFetchImages';
import { useFavourites } from '../hooks/useFavourites';
import { FavouritesContext } from '../store/FavouritesContext';
import Button from './Button';
import CardItem from './CardItem';
import styles from './Cards.module.scss';
import Error from './Error';
import Message from './Message';

function Cards() {
  const { images, isLoading, error, loadMore } = useFetchImages();
  const { showFavourites } = useContext(FavouritesContext);
  const { favourites, toggleFavourite } = useFavourites();

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
    () => (showFavourites ? favourites : images),
    [showFavourites, favourites, images],
  );

  if (showFavourites && favourites.length === 0) {
    return (
      <Message>
        <Button href="/"> Find your favourite photos</Button>{' '}
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
            isFavourite={favourites.some((fav) => fav.id === image.id)}
            toggleFavourite={toggleFavourite}
          />
        ))}
      </ul>

      {!error && !showFavourites && (
        <Button
          isCenter={true}
          onClick={() => {
            loadMore();
          }}
        >
          {isLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}

      {error && !showFavourites && (
        <Error message={error}>
          <Button href="/">Retry</Button>
        </Error>
      )}
    </>
  );
}

export default Cards;
