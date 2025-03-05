import styles from "./Message.module.scss";

function Message({ message, error = false }) {
  return (
    <div
      className={styles.error}
      style={{
        color: error ? "red" : "green",
      }}
    >
      <p>{message}</p>
    </div>
  );
}

export default Message;
