import styles from "./Button.module.scss";

function Button({ children, onClick, isCenter }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${isCenter ? styles.center : ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
