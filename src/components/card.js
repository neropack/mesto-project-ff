import { data } from "../utils/constants";
import { selectors } from "../utils/selectors";
// @todo: Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, openPopupImage, userID) {
    // переменные: клонирование шаблона и получение кнопки удаления
    const cardTemplate = data.cardTemplate.templateContent;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector(selectors.buttons.like);
    const likeCount = cardElement.querySelector(selectors.cardTemplate.likes);
    const user = cardData.owner['_id'];
    // передача значений в шаблон из cards.js
    cardImage.src = cardData['link'];
    cardImage.alt = cardData['name'];
    cardElement.querySelector('.card__title').textContent = cardData['name'];

    // проверка количества лайков
    cardData.likes.length ? likeCount.textContent = cardData.likes.length : likeCount.textContent = '0';

    // проверка лайкнул ли пользователь карточку
    cardData.likes.some(obj => obj['_id'] === userID) && likeButton.classList.add('card__like-button_is-active');

    // удаление элемента при нажатии
    if (cardData.owner['_id'] === userID) {
        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', (cardElement) => deleteCard(cardElement, cardData['_id']));
    }

    cardImage.onerror = () => {
        console.log('Ошибка рендера карточки');
        cardElement.remove();
    }

    // лайк карточка
    likeButton.addEventListener('click', () => {
        likeCard({
            cardId: cardData['_id'],
            button: likeButton,
            counter: likeCount,
        })
    })

    // открытие попапа
    cardImage.addEventListener('click', () => openPopupImage(cardData));

    return cardElement;
}