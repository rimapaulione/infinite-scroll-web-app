import styles from "./Error.module.css";

function Error({ message }) {
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
}

export default Error;
