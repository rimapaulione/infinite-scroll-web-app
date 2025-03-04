import Button from "./Button";
import styled from "./Header.module.scss";

function Header() {
  return (
    <header className={styled.header}>
      <h3>Frontend Homework </h3>
      <Button>Get Favorities</Button>
    </header>
  );
}

export default Header;
