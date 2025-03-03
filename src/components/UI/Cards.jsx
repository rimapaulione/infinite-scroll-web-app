import { useFetchImages } from "../hooks/useFetchImages";
import Button from "./Button";
import CardItem from "./CardItem";
import styles from "./Cards.module.scss";
import Error from "./Error";

function Cards() {
  const { images, loading, error, loadMore } = useFetchImages();

  if (error) return <Error message={error} />;

  return (
    <>
      <ul className={styles.cards}>
        {images.map((image) => (
          <CardItem key={image.id} image={image} />
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
