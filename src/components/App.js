import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImageOpen, setImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({})

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => console.log(err));
  }, [])

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
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.cardDelete(card._id)
    .then(() => {
      setCards(cards.filter((item) => item !== card));
    })
    .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(cardData) {
    api.addNewCard(cardData)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

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
        handleCardLike={handleCardLike}
        handleCardDelete={handleCardDelete}
        cards={cards}
      />

      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

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
