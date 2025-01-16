 // @todo: Функция создания карточки
import { selectors } from "../../utils/selectors";

export function Card(cardTemplate, cbDeleteCard, cbShowImage, cbLikeCard) {
    // переменные: клонирование шаблона и получение кнопки удаления
    this.cardElement = cardTemplate.querySelector(selectors.cardTemplate.card).cloneNode(true);
    this.deleteButton = this.cardElement.querySelector(selectors.buttons.delete);
    this.cardImage = this.cardElement.querySelector(selectors.cardTemplate.image);
    this.likeButton = this.cardElement.querySelector(selectors.buttons.like);
    this.cardTitle = this.cardElement.querySelector(selectors.cardTemplate.title);

    this.create = (cardData) => {
        this.cardImage.src = cardData['link'];
        this.cardImage.alt = cardData['name'];
        this.cardTitle.textContent = cardData['caption'];
    }
    this.delete = () => {
        cbDeleteCard({
            'place-name': this.cardTitle.textContent,
        });
        this.cardElement.remove();
    }
    this.show = () => {
        cbShowImage({
            'name': this.cardTitle.textContent,
            'link': this.cardImage.src,
        });
    }
    this.like = () => {
        cbLikeCard(this.likeButton);
    }
    this.render = (cardsList, method) => {
        cardsList[method](this.cardElement);
    }

    this.cardImage.addEventListener('click', this.show);
    this.deleteButton.addEventListener('click', this.delete);
    this.likeButton.addEventListener('click', this.like);
    
    return {
        create: this.create,
        render: this.render,
    };
}