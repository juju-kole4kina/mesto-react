import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
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

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    api.setUserAvatar(userData)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
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
      <EditProfilePopup isOpen={isEditProfilePopupOpen} isClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

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

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

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
