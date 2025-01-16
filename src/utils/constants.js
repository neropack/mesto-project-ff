// перенсти все const
import { selectors } from './selectors.js';

export const data = {
    buttons: {
        editProfile: document.querySelector(selectors.buttons.edit),
        addCard: document.querySelector(selectors.buttons.add),
    },
    userInfo: {
        name: document.querySelector(selectors.profile.name),
        description: document.querySelector(selectors.profile.description),
    },
    cardList: {
        list: document.querySelector(selectors.cardList.list),
    },
    popups: {
        edit: document.querySelector(selectors.popups.edit),
        add: document.querySelector(selectors.popups.add),
        image: document.querySelector(selectors.popups.image),
    },
    cardTemplate: {
        templateContent: document.querySelector(selectors.cardTemplate.template).content,
        card: document.querySelector(selectors.cardTemplate.card),
    }
}


