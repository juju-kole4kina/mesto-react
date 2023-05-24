import React from 'react';
import { api } from '../utils/api.js';
import Card from './Card.js';


function Main(props) {
const [userName, setUserName] = React.useState('');
const [userDescription, setUserDescription] = React.useState('');
const [userAvatar, setUserAvatar] = React.useState('');
const [cards, setCards] = React.useState([]);

React.useEffect(() => {
  Promise.all([api.getInitialCard(), api.getUserInfo()])
  .then(([cards, user]) => {
    setUserName(user.name);
    setUserDescription(user.about);
    setUserAvatar(user.avatar);
    setCards(cards);
  })
  .catch(err => console.log(err));
}, [])

  return(
    <main className="content">
      <section className="profile" aria-label="Профайл пользователя">
      <div className="profile__avatar" onClick={props.onEditAvatar}>
        <img src={userAvatar} alt="Аватар" className="profile__image" />
      </div>
      <div className="profile__info">
        <h1 className="profile__user-name">{userName}</h1>
        <p className="profile__user-description">{userDescription}</p>
        <button onClick={props.onEditProfile} type="button" className="profile__edit-btn" aria-label="Редактировать профиль"></button>
      </div>
      <button onClick={props.onAddPlace} type="button" className="profile__add-btn" aria-label="Добавить фото"></button>
    </section>
    <section className="gallery" aria-label="Галерея">
      <ul className="gallery__list">
        {cards.map((card) => (
          <Card key={card._id} link={card.link} name={card.name} likeCount={card.likes.length} card={card} onCardClick={props.onCardClick} />
        ))}
      </ul>
    </section>
  </main>
  );
}

export default Main;
