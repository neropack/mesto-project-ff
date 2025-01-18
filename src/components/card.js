import { data } from "../utils/constants";
import { selectors } from "../utils/selectors";
// @todo: Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, popupImage) {
    // переменные: клонирование шаблона и получение кнопки удаления
    const cardTemplate = data.cardTemplate.templateContent;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector(selectors.buttons.like);

    // передача значений в шаблон из cards.js
    cardImage.src = cardData['link'];
    cardImage.alt = cardData['place-name'];
    cardElement.querySelector('.card__title').textContent = cardData['place-name'];

    // удаление элемента при нажатии
    deleteButton.addEventListener('click', (cardElement) => deleteCard(cardElement));
    // лайк карточка
    likeButton.addEventListener('click', (likeButton) => likeCard(likeButton));
    // открытие попапа
    cardImage.addEventListener('click', () => popupImage(cardData));

    return cardElement;
}