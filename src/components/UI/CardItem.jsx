import { useState } from "react";
import styles from "./CardItem.module.css";
import { sliceTitle } from "../../utils/helpers";
import Button from "./Button";

function CardItem({ image }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={`${image.src.original}`}
        alt={image.alt}
        className={styles.image}
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
          <Button className={styles.button}>Favorite</Button>
        </div>
      )}
    </li>
  );
}

export default CardItem;
