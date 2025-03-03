import { useFetchImages } from "../hooks/useFetchImages";
import Button from "./Button";
import CardItem from "./CardItem";
import styles from "./Cards.module.css";

function Cards() {
  const { images, loading, error, loadMore } = useFetchImages();

  if (error)
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
      </div>
    );

  return (
    <>
      <ul className={styles.cards}>
        {images.map((image) => (
          <CardItem key={image.id} image={image} />
        ))}
      </ul>

      <Button
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
