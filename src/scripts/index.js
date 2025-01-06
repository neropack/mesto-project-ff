import addIcon from '../images/add-icon.svg';
import avatarImage from '../images/avatar.jpg';
import cardOne from '../images/card_1.jpg';
import cardTwo from '../images/card_2.jpg';
import cardThree from '../images/card_3.jpg';
import closeIcon from '../images/close.svg';
import deleteIcon from '../images/delete-icon.svg';
import editIcon from '../images/edit-icon.svg';
import likeActiveIcon from '../images/like-active.svg';
import likeInactiveIcon from '../images/like-inactive.svg';
import logoImage from '../images/logo.svg';

const arrImages = [
    { name: 'Add Icon', link: addIcon },
    { name: 'Avatar Image', link: avatarImage },
    { name: 'Card One', link: cardOne },
    { name: 'Card Two', link: cardTwo },
    { name: 'Card Three', link: cardThree },
    { name: 'Close Icon', link: closeIcon },
    { name: 'Delete Icon', link: deleteIcon },
    { name: 'Edit Icon', link: editIcon },
    { name: 'Like Active Icon', link: likeActiveIcon },
    { name: 'Like Inactive Icon', link: likeInactiveIcon },
    { name: 'Logo', link: logoImage },
]
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
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
    console.log(card);
    cardsList.append(card.create());
});

console.log('kekus');