import style from './Message.module.scss';

function Message({ children }) {
  return (
    <div className={style.card}>
      <img src="/no_favorite.png" />
      <div className={style.container}>
        <h1>No Favorites</h1>
        {children}
      </div>
    </div>
  );
}

export default Message;
