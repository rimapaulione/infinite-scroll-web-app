import { useContext } from 'react';
import Button from './Button';
import styled from './Header.module.scss';
import { FavouritesContext } from '../store/FavouritesContext';

function Header() {
  const { showFavourites, setShowFavourites } = useContext(FavouritesContext);

  return (
    <header className={styled.header}>
      <h1>
        <a href="/">Frontend Homework </a>
      </h1>
      <Button onClick={() => setShowFavourites((prev) => !prev)}>
        {showFavourites ? 'Show all photos' : 'Show favourites'}
      </Button>
    </header>
  );
}

export default Header;
