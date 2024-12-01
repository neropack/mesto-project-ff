// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((el) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = el.link;
    cardElement.querySelector('.card__title').textContent = el.name;

    cardsList.append(cardElement);
})