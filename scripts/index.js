// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
function deleteCard (event) {
    event.currentTarget.parentNode.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((el) => {
    // переменные: клонирование шаблона и получение кнопки удаления
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    // удаление элемента при нажатии
    deleteButton.addEventListener('click', deleteCard);

    // передача значений в шаблон из cards.js
    cardElement.querySelector('.card__image').src = el.link;
    cardElement.querySelector('.card__title').textContent = el.name;

    // добавление заполненного шаблона в список
    cardsList.append(cardElement);
})