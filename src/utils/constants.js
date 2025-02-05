// перенсти все const
import { selectors } from './selectors.js';

export const data = {
    buttons: {
        editProfile: document.querySelector(selectors.buttons.edit),
        addCard: document.querySelector(selectors.buttons.add),
        closePopup: document.querySelectorAll(selectors.buttons.close),
    },
    userInfo: {
        name: document.querySelector(selectors.profile.name),
        description: document.querySelector(selectors.profile.description),
        avatar: document.querySelector(selectors.profile.avatar),
        editAvatar: document.querySelector(selectors.profile.edit),
    },
    cardList: {
        list: document.querySelector(selectors.cardList.list),
    },
    popups: {
        edit: document.querySelector(selectors.popups.edit),
        add: document.querySelector(selectors.popups.add),
        image: document.querySelector(selectors.popups.image),
        avatar: document.querySelector(selectors.popups.avatar),
    },
    imagePopup: {
        image: document.querySelector(selectors.popupImage.image),
        caption: document.querySelector(selectors.popupImage.caption),
    },
    cardTemplate: {
        templateContent: document.querySelector(selectors.cardTemplate.template).content,
        card: document.querySelector(selectors.cardTemplate.card),
    },
}

export const baseURL = 'https://nomoreparties.co/v1/wff-cohort-31';
