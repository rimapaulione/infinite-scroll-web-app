import styles from "./Error.module.scss";

function Error({ message, children }) {
  return (
    <div className={styles.error}>
      <div className={styles.message}>
        <h3>Error</h3>
        <div>{message}</div>
      </div>
      {children}
    </div>
  );
}

export default Error;
