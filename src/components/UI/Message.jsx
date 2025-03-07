import style from './Message.module.scss';

function Message({ children }) {
  return (
    <div className={style.card}>
      <img src="/no_favourite.png" alt="No favourite images" />
      <div className={style.container}>
        <h1>No Favourites</h1>
        {children}
      </div>
    </div>
  );
}

export default Message;
