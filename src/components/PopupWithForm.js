import React from 'react';

function PopupWithForm(props) {

  return(
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}  aria-label={props.title}>
    <div className="popup__container">
      <button type="button" className="popup__exit-btn" aria-label="Закрыть модальное окно" onClick={props.onClose}></button>
      <form action="post" className={`popup__form popup__form_type_${props.name}`} name={props.name} noValidate={true}>
        <h2 className="popup__heading">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__safe-btn">{(props.name === "verification") ? 'Да' : 'Сохранить'}</button>
      </form>
    </div>
  </section>
  );
}

export default PopupWithForm;
