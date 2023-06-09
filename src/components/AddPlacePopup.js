import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  // const [name, setName] = React.useState('');
  // const [link, setLink] = React.useState('');

  // function handleNameChange(e) {
  //   setName(e.target.value);
  // }

  // function handleLinkChange(e) {
  //   setLink(e.target.value);
  // }

  const cardNameRef = React.useRef('');
  const cardLinkRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Новое место"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input type="text" className="popup__input-item" minLength="2" maxLength="30" name="name" id="title-card"
            placeholder="Название" ref={cardNameRef} required />
      <span className="popup__input-error title-card-error"></span>
      <input type="url" className="popup__input-item" name="link" id="card-image" placeholder="Ссылка на изображение" ref={cardLinkRef}
          required />
      <span className="popup__input-error card-image-error"></span>
  </PopupWithForm>
  )
}

export default AddPlacePopup;
