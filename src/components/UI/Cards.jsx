import CardItem from "./CardItem";
import styles from "./Cards.module.css";

function Cards() {
  const photos = [
    { id: 1, name: "Water Dog", author: "Brad Nickerson", image: "/test.jpg" },
    { id: 2, name: "photo1", author: "Test", image: "/test.jpg" },
    { id: 3, name: "photo1", author: "Test", image: "/test.jpg" },
    { id: 4, name: "photo1", author: "Test", image: "/test.jpg" },
    { id: 5, name: "photo1", author: "Test", image: "/test.jpg" },
    { id: 6, name: "photo1", author: "Test", image: "/test.jpg" },
    { id: 7, name: "photo1", author: "Test", image: "/test.jpg" },
    { id: 8, name: "photo1", author: "Test", image: "/test.jpg" },
  ];
  return (
    <ul className={styles.cards}>
      {photos.map((photo) => (
        <CardItem key={photo.id} photo={photo} />
      ))}
    </ul>
  );
}

export default Cards;
