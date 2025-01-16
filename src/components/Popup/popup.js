import { selectors } from "../../utils/selectors";
import { data } from "../../utils/constants";

export function Popup(popup) {
    this.closeButton = popup.querySelector(selectors.buttons.close);

    this.handleEscClose = (e) => {
        e.key === 'Escape' && this.close();
    }
    this.handleOverlayClose = (e) => {
        e.target.isEqualNode(e.currentTarget) && this.close();
    }

    this.open = () => {
        popup.classList.add('popup_is-opened');
        popup.addEventListener('click', this.handleOverlayClose);
        document.addEventListener('keydown', this.handleEscClose);
    };
    this.close = () => {
        popup.classList.remove('popup_is-opened');
        popup.removeEventListener('click', this.handleOverlayClose);
        document.removeEventListener('keydown', this.handleEscClose);
    };

    this.closeButton.addEventListener('click', this.close);

    return {
        open: this.open,
        close: this.close,
    };
}