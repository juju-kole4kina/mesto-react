import React from 'react';
import Card from './Card.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
// const [userName, setUserName] = React.useState('');
// const [userDescription, setUserDescription] = React.useState('');
// const [userAvatar, setUserAvatar] = React.useState('');
const [cards, setCards] = React.useState([]);

const currentUser = React.useContext(CurrentUserContext);

React.useEffect(() => {
  api.getInitialCard()
  .then((cards) => {
    // setUserName(user.name);
    // setUserDescription(user.about);
    // setUserAvatar(user.avatar);
    setCards(cards);
  })
  .catch(err => console.log(err));
}, [])

  return(
    <main className="content">
      <section className="profile" aria-label="Профайл пользователя">
      <div className="profile__avatar" onClick={props.onEditAvatar}>
        <img src={currentUser.avatar} alt="Аватар" className="profile__image" />
      </div>
      <div className="profile__info">
        <h1 className="profile__user-name">{currentUser.name}</h1>
        <p className="profile__user-description">{currentUser.about}</p>
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
