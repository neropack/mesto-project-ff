import './index.css';
import initialCards from './data/cards';
import { data } from './utils/constants.js';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// @todo: DOM узлы
const cardsList = data.cardList.list;
const closeButtons = data.buttons.closePopup;
const forms = document.forms;
const editForm = forms['edit-profile'];
const addForm = forms['new-place'];

// -------------------------------- Колбэки --------------------------------
// @todo: Функция удаления карточки
function deleteCard(event) {
    event.currentTarget.parentNode.remove();
}

// функция лайка карточки
function likeCard(event) {
    event.currentTarget.classList.toggle('card__like-button_is-active');
}

// функция показа картинки в попапе
function showImage(image) {
    data.imagePopup.image.src = image['link'];
    data.imagePopup.caption.textContent = image['place-name'];
    openModal(data.popups.image)
}

editForm.name.value = data.userInfo.name.textContent;
editForm.description.value = data.userInfo.description.textContent;

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    data.userInfo.name.textContent = editForm.name.value;
    data.userInfo.description.textContent = editForm.description.value;
    closeModal(editForm.parentNode.parentNode);
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const card = createCard({
        'place-name': addForm['place-name'].value,
        'link': addForm['link'].value,
    }, deleteCard, likeCard, showImage);
    addCard(card, 'prepend');
    addForm.reset();
    closeModal(addForm.parentNode.parentNode);
});

// -------------------------------- Слушатели --------------------------------
data.buttons.addCard.addEventListener('click', () => {
    openModal(data.popups.add);
});

data.buttons.editProfile.addEventListener('click', () => {
    openModal(data.popups.edit);
});

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        closeModal(button.closest('.popup'));
    });
});

// -------------------------------- Вывод карточек на страницу --------------------------------

// @todo: Вывести карточки на страницу
function renderCards(data, method) {
    data.forEach((cardData) => {
        //добавление заполненного шаблона в список
        const card = createCard(cardData, deleteCard, likeCard, showImage);
        addCard(card, method)
    });
}

function addCard(data, method) {
    cardsList[method](data);
}

renderCards(initialCards, 'append');