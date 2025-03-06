import styles from "./Button.module.scss";

function Button({ children, onClick, isCenter, href, ...props }) {
  const buttonClass = isCenter
    ? `${styles.button} ${styles.center}`
    : styles.button;

  if (href) {
    return (
      <a href={href} className={buttonClass} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass} {...props}>
      {children}
    </button>
  );
}

export default Button;
