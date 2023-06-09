import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `gallery__delete-btn ${isOwn ? '' : 'gallery__delete-btn_hidden'}`
  );

  const isLike = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `gallery__like-btn ${isLike ? 'gallery__like-btn_active' : ''}`
  );

  function handleClick(){
    props.onCardClick(props.card);
  }
  return(
    <li className="gallery__item">
            <img src={props.link} alt={props.name} className="gallery__image" onClick={handleClick} />
            <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить"></button>
            <div className="gallery__description">
              <h2 className="gallery__item-title">{props.name}</h2>
              <div className="card__like">
                <button type="button" className={cardLikeButtonClassName} aria-label="Мне нравится"></button>
                <span className="card__like-count">{props.likeCount}</span>
              </div>
            </div>
          </li>
  )
}

export default Card;
