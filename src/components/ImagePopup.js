import React from 'react';

function ImagePopup(props) {
  return(
    <section className={`popup popup_type_opened-card ${props.isOpen ? 'popup_opened' : ''}`} aria-label="Открыть карточку">
      <div className="popup__picture-container">
        <button type="button" className="popup__exit-btn" aria-label="Закрыть изображение" onClick={props.onClose}></button>
        <figure className="popup__figure">
          <img src={props.card.link} alt={props.card.name}
        className="popup__img-card" />
          <figcaption className="popup__descritption-card">{props.card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
