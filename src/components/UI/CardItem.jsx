import { useState } from "react";
import styles from "./CardItem.module.scss";
import { sliceTitle } from "../../utils/helpers";
import Button from "./Button";

function CardItem({ image, onToggleFavourite, isFavorite }) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <li
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image.src.tiny}
        srcSet={`${image.src.small} 300w,${image.src.medium} 768w, ${image.src.large} 1024w`}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={image.alt ? image.alt : "Image"}
        className={styles.image}
        loading="lazy"
        style={{
          filter: loaded ? "none" : "blur(10px)",
          transition: "filter 0.5s ease-in-out",
        }}
        onLoad={handleImageLoad}
      />

      {hovered && (
        <div className={styles.overlay}>
          <div>
            <h1>
              {image.alt.length === 0
                ? "Photo of nature"
                : sliceTitle(image.alt, 3)}
            </h1>
            <h2>{image.photographer}</h2>
          </div>
          <Button onClick={() => onToggleFavourite(image.id)}>
            {isFavorite ? "Unfavourite" : "Favourite"}
          </Button>
        </div>
      )}
    </li>
  );
}

export default CardItem;
