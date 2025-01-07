export function Popup(popup) {
    this.closeButton = popup.querySelector('.popup__close');

    this.handleEscClose = (e) => {
        console.log(e.key);
        e.key === 'Escape' && this.close();
    }
    this.handleOverlayClose = (e) => {
        e.target.isEqualNode(e.currentTarget) && this.close();
    }

    this.open = () => {
        popup.classList.add('popup_is-opened');
        this.closeButton.addEventListener('click', this.close);
        popup.addEventListener('click', this.handleOverlayClose);
        document.addEventListener('keydown', this.handleEscClose);
    };
    this.close = () => {
        popup.classList.remove('popup_is-opened');
        this.closeButton.removeEventListener('click', this.close);
        popup.removeEventListener('click', this.handleOverlayClose);
        document.removeEventListener('keydown', this.handleEscClose);
    };

    return {
        open: this.open,
    };
}
