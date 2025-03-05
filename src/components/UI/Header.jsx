import { useContext } from "react";
import Button from "./Layout/Button";
import styled from "./Header.module.scss";
import { FavoritesContext } from "../store/FavoritesContext";

function Header() {
  const { showFavorites, setShowFavorites } = useContext(FavoritesContext);

  return (
    <header className={styled.header}>
      <h3>Frontend Homework </h3>
      <Button onClick={() => setShowFavorites((prev) => !prev)}>
        {showFavorites ? "Show all photos" : "Show favorites"}
      </Button>
    </header>
  );
}

export default Header;
