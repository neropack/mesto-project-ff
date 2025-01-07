import '../pages/index.css';

import { initialCards } from './cards.js';
import { Popup } from '../components/Popup/popup.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const editPopupEl = document.querySelector('.popup_type_edit');
const addPopupEl = document.querySelector('.popup_type_new-card')
const addButton = document.querySelector('.profile__add-button');
// todo объект с селекторами

// @todo: Функция создания карточки
function Card(cardData, cbDeleteCard, cbShowImage) {
    // переменные: клонирование шаблона и получение кнопки удаления
    this.cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    this.deleteButton = this.cardElement.querySelector('.card__delete-button');
    this.cardImage = this.cardElement.querySelector('.card__image');
    this.create = () => this.cardElement;
    this.delete = () => {
        this.cardElement.remove();
        cbDeleteCard(cardData);
    }
    this.show = () => {
        cbShowImage(this.cardImage);
    }
    // console.log(this);
    // // передача значений в шаблон из cards.js
    this.cardImage.src = cardData.link;
    this.cardImage.alt = cardData.name;
    this.cardElement.querySelector('.card__title').textContent = cardData.name;

    // // удаление элемента при нажатии
    // должен быть один eventlistener
    this.cardImage.addEventListener('click', this.show);
    this.deleteButton.addEventListener('click', this.delete);
    // @todo сделать Like
    return {
        create: this.create,
    };
}
// @todo: Функция удаления карточки
function deleteCard(cardData) {
    console.log(`карточка ${cardData.name} удалена`)
}

function showImage(image) {
    console.log(image);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((el) => {
    //добавление заполненного шаблона в список
    const card = new Card(el, deleteCard, showImage);
    cardsList.append(card.create());
});

editButton.addEventListener('click', () => {
    editPopup.open();
});

addButton.addEventListener('click', () => {
    addPopup.open();
});

const editPopup = new Popup(editPopupEl);
const addPopup = new Popup(addPopupEl);