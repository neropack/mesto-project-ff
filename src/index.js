import './index.css';
import { createCard } from './components/card.js';
import { data } from './utils/constants.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { openModal, closeModal } from './components/modal.js';
import { selectors } from './utils/selectors.js';
import * as api from './components/api.js';

// @todo: DOM узлы
const cardsList = data.cardList.list;
const closeButtons = data.buttons.closePopup;
const forms = document.forms;
const editForm = forms['edit-profile'];
const addForm = forms['new-place'];
const editAvatarForm = forms['edit-profile-avatar'];

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

let userData = {};

// -------------------------------- Колбэки --------------------------------
// @todo: Функция удаления карточки
function deleteCard(event, cardId) {
    event.currentTarget.parentNode.remove();
    api.deleteCard(cardId);
}

// функция лайка карточки
function likeCard({ cardId, button, counter }) {

    if (button.classList.contains('card__like-button_is-active')) {
        api.unlikeCard(cardId)
            .then(({ likes }) => {
                button.classList.remove('card__like-button_is-active');
                if (likes.length) {
                    counter.classList.add('card__like-counter_is-active');
                    counter.textContent = likes.length;
                } else {
                    counter.classList.remove('card__like-counter_is-active');
                    counter.textContent = likes.length;
                }
            })
            .catch((err) => console.error(err));
    } else {
        api.likeCard(cardId)
            .then(({ likes }) => {
                button.classList.add('card__like-button_is-active');

                counter.classList.add('card__like-counter_is-active');
                counter.textContent = likes.length;
            })
            .catch((err) => console.error(err));
    }
}

// функция показа картинки в попапе
function showImage(image) {
    data.imagePopup.image.src = image['link'];
    data.imagePopup.caption.textContent = image['place-name'];
    openModal(data.popups.image);
}

function setProfile(user) {
    userData = {...user};
    data.userInfo.name.textContent = user.name;
    data.userInfo.description.textContent = user.about;
    data.userInfo.avatar.style.backgroundImage = `url('${user.avatar}')`;
}

function renderSaving(isSaving, button) {
    isSaving ? button.textContent = 'Сохранение...' : button.textContent = 'Сохранить';
}

// -------------------------------- Слушатели --------------------------------
data.buttons.addCard.addEventListener('click', () => {
    clearValidation(data.popups.edit, validationConfig);
    openModal(data.popups.add);
});

data.buttons.editProfile.addEventListener('click', () => {
    editForm.name.value = data.userInfo.name.textContent;
    editForm.description.value = data.userInfo.description.textContent;
    clearValidation(data.popups.edit, validationConfig);
    openModal(data.popups.edit);
});

data.userInfo.editAvatar.addEventListener('click', (e) => {
    clearValidation(data.popups.avatar, validationConfig);
    openModal(data.popups.avatar);
})

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        closeModal(button.closest('.popup'));
    });
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const saveButton = editForm.querySelector(selectors.buttons.save);
    data.userInfo.name.textContent = editForm.name.value;
    data.userInfo.description.textContent = editForm.description.value;
    renderSaving(true, saveButton);
    api.editProfile(editForm.name.value, editForm.description.value).finally(() => renderSaving(false, saveButton));
    closeModal(data.popups.edit);
});

editAvatarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const saveButton = editAvatarForm.querySelector(selectors.buttons.save);

    api.checkImage(editAvatarForm.link.value)
        .then((res) => {
            const contentType = res.headers.get('Content-Type');
            return contentType.startsWith('image/');
        })
        .then((result) => {
            result 
            ? api.updateAvatar(editAvatarForm.link.value)
                .then((res) => {
                    data.userInfo.avatar.style.backgroundImage = `url('${res.avatar}')`;
                })
                .finally(() => renderSaving(false, saveButton))
            : Promise.reject(`Не картинка`);
        })
        .catch((err) => console.log(err));
    renderSaving(true, saveButton);
    
    closeModal(data.popups.avatar);
})

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cardName = addForm['place-name'].value;
    const cardLink = addForm['link'].value;
    const saveButton = addForm.querySelector(selectors.buttons.save);

    renderSaving(true, saveButton);
    api.addCard(cardName, cardLink).then((cardData) => {
        const card = createCard(cardData, deleteCard, likeCard, showImage, userData._id);
        addCard(card, 'prepend');
        addForm.reset();
        closeModal(data.popups.add);
    })
        .finally(() => renderSaving(false, saveButton));
});

// -------------------------------- Вывод карточек на страницу --------------------------------

// @todo: Вывести карточки на страницу
function renderCards(data, method) {
    data.forEach((cardData) => {
        //добавление заполненного шаблона в список
        const card = createCard(cardData, deleteCard, likeCard, showImage, userData._id);
        addCard(card, method);
    });
}

function addCard(data, method) {
    cardsList[method](data);
}

enableValidation(validationConfig);

Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([user, cards]) => {  
        setProfile(user);
        renderCards(cards, 'append');
    })
    .catch((err) => {
        console.log(err);
    });