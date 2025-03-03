import { useState } from "react";
import styles from "./CardItem.module.css";

function CardItem({ photo }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={`${photo.image}`} alt={photo.name} className={styles.image} />

      {hovered && (
        <div className={styles.overlay}>
          <div>
            <h1>{photo.name}</h1>
            <h2>{photo.author}</h2>
          </div>
          <button className={styles.button}>Favorite</button>
        </div>
      )}
    </li>
  );
}

export default CardItem;
