import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImageOpen, setImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({})

  React.useEffect(() => {
    api.getUserInfo()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => console.log(err));
  }, [])

  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true);
    console.log('попап аватара');
  }

  function handleEditProfileClick(){
    setEditProfilePopupOpen(true);
    console.log('попап профиля');
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true);
      console.log('попап добавления карточки');
  }

  function handleCardClick(card){
    setImageOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link
    })
    console.log('попап открытия карточки');
  }

  function closeAllPopups(){
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImageOpen(false);

    console.log('закрыть попап');
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />
      <PopupWithForm
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        title="Редактировать профиль"
        buttonText="Сохранить"
      >
        <input type="text" className="popup__input-item" minLength="2" maxLength="40" name="name" id="user-name"
            placeholder="Ваше имя" required />
        <span className="popup__input-error user-name-error"></span>
        <input type="text" className="popup__input-item" minLength="2" maxLength="200" name="about" id="user-description"
            placeholder="Ваш род деятельности" required />
        <span className="popup__input-error user-description-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        title="Новое место"
        buttonText="Сохранить"
      >
        <input type="text" className="popup__input-item" minLength="2" maxLength="30" name="name" id="title-card"
              placeholder="Название" required />
        <span className="popup__input-error title-card-error"></span>
        <input type="url" className="popup__input-item" name="link" id="card-image" placeholder="Ссылка на изображение"
              required />
        <span className="popup__input-error card-image-error"></span>
      </PopupWithForm>

      <PopupWithForm PopupWithForm
        name="edit-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        title="Обновить аватар"
        buttonText="Сохранить"
      >
        <input type="url" className="popup__input-item" name="link" id="avatar-image" placeholder="Ссылка на изображение"
              required />
        <span className="popup__input-error avatar-image-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="verification"
        title="Вы уверены?"
        buttonText="Да"
      />

      <ImagePopup
        isOpen={isImageOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
