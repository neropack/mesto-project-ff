// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
    // переменные: клонирование шаблона и получение кнопки удаления
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');

    // передача значений в шаблон из cards.js
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    // удаление элемента при нажатии
    deleteButton.addEventListener('click', (evt) => deleteCard(evt));
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(event) {
    event.currentTarget.parentNode.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((el) => {
    //добавление заполненного шаблона в список
    const card = createCard(el, deleteCard);
    cardsList.append(card);
});