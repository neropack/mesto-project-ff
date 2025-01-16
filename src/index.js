import './index.css';
import { Card } from './components/Card/card.js';
import { data } from './utils/constants.js';
import { PopupWithForm } from './components/Popup/popup-with-form.js';
import { PopupWithImage } from './components/Popup/popup-with-image.js';
import initialCards from './data/cards';

const editPopup = new PopupWithForm(data.popups.edit, 'edit-profile', (userData) => {
    data.userInfo.name.textContent = userData.name;
    data.userInfo.description.textContent = userData.description;
});

const addPopup = new PopupWithForm(data.popups.add, 'new-place', (cardData) => {
    const card = new Card(data.cardTemplate.templateContent, deleteCard, showImage, likeCard);
    card.create({
        "name": cardData['place-name'],
        "link": cardData['link'],
        "caption": cardData['place-name'],
    });
    card.render(data.cardList.list, 'prepend');
});

// ------------------------------ Слушатели кнопок ------------------------------
data.buttons.editProfile.addEventListener('click', () => {
    editPopup.setValues({
        "name": data.userInfo.name.textContent,
        "description": data.userInfo.description.textContent,
    });
    editPopup.open();
});

data.buttons.addCard.addEventListener('click', () => {
    addPopup.open();
});
// ------------------------------------------------------------------------------

// -------------------------------- Колбэки Card --------------------------------
function deleteCard(cardData) {
    console.log(`карточка ${cardData['place-name']} удалена`);
}

function likeCard(button) {
    button.classList.toggle('card__like-button_is-active');
}

function showImage(cardData) {
    const imagePopup = new PopupWithImage(data.popups.image, {
        "name": cardData['name'],
        "link": cardData['link'],
    });
    imagePopup.open();
}
// ------------------------------------------------------------------------------

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    //добавление заполненного шаблона в список
    const card = new Card(data.cardTemplate.templateContent, deleteCard, showImage, likeCard);
    card.create({
        "name": cardData['place-name'],
        "link": cardData['link'],
        "caption": cardData['place-name'],
    });
    card.render(data.cardList.list, 'append');
});