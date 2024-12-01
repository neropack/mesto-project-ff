// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');

// @todo: Функция создания карточки
function addCard (data) {
    // переменные: клонирование шаблона и получение кнопки удаления
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    // передача значений в шаблон из cards.js
    cardElement.querySelector('.card__image').src = data.link;
    cardElement.querySelector('.card__title').textContent = data.name;

    // удаление элемента при нажатии
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard (event) {
    event.currentTarget.parentNode.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((el) => {
    //добавление заполненного шаблона в список
    const card = addCard(el);
    cardsList.append(card);
});