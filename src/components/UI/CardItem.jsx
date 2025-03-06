import styles from './CardItem.module.scss';
import { sliceTitle } from '../../utils/helpers';
import Button from './Button';
import { useState } from 'react';

function CardItem({ image, isFavorite, toggleFavorite, ref }) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <li
      ref={ref}
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image.src.tiny}
        srcSet={`${image.src.small} 300w,${image.src.medium} 768w, ${image.src.large} 1024w`}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={image.alt ? image.alt : 'Image'}
        className={styles.image}
        loading="lazy"
        style={{
          filter: loaded ? 'none' : 'blur(10px)',
          opacity: loaded ? 1 : 0,
          transition: 'filter 0.2s ease-in-out',
        }}
        onLoad={handleImageLoad}
      />

      {hovered && (
        <div className={styles.overlay}>
          <div>
            <h1>
              {image.alt.length === 0
                ? 'Photo of nature'
                : sliceTitle(image.alt, 3)}
            </h1>
            <h2>{image.photographer}</h2>
          </div>
          <Button onClick={() => toggleFavorite(image)}>
            {isFavorite ? 'Unfavourite' : 'Favourite'}
          </Button>
        </div>
      )}
    </li>
  );
}

export default CardItem;
