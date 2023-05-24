import React from 'react';

function Card(props) {

  function handleClick(){
    props.onCardClick(props.card);
  }
  return(
    <li className="gallery__item" key={props.id}>
            <img src={props.link} alt={props.name} className="gallery__image" onClick={handleClick} />
            <button type="button" className="gallery__delete-btn" aria-label="Удалить"></button>
            <div className="gallery__description">
              <h2 className="gallery__item-title">{props.name}</h2>
              <div className="card__like">
                <button type="button" className="gallery__like-btn" aria-label="Мне нравится"></button>
                <span className="card__like-count">{props.likeCount}</span>
              </div>
            </div>
          </li>
  )
}

export default Card;
