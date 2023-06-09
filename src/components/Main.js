import React from 'react';
import Card from './Card.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
const [cards, setCards] = React.useState([]);

const currentUser = React.useContext(CurrentUserContext);

React.useEffect(() => {
  api.getInitialCard()
  .then((cards) => {
    setCards(cards);
  })
  .catch(err => console.log(err));
}, [])

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  api.changeLikeCardStatus(card._id, !isLiked)
  .then((newCard) => {
    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
    setCards(newCards);
  });
}

function handleCardDelete(card) {
  api.cardDelete(card._id)
  .then(() => {
    setCards(cards.filter((item) => item !== card));
  })
  .catch((err) => console.log(err));
}

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
          <Card key={card._id} link={card.link} name={card.name} likeCount={card.likes.length} card={card} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        ))}
      </ul>
    </section>
  </main>
  );
}

export default Main;
