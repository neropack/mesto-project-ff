import { Popup } from "./popup";
import { selectors } from "../../utils/selectors";

export function PopupWithImage(popupElem, cardData) {
    this.popup = new Popup(popupElem);
    this.img = popupElem.querySelector(selectors.popupImage.image);
    this.caption = popupElem.querySelector(selectors.popupImage.caption);

    this.img.src = cardData['link'];
    this.caption.textContent = cardData['name'];

    return Object.create(this.popup);
}