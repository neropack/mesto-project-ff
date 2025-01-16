import { Popup } from "./popup";

export function PopupWithForm(popupElem, formName, cbSubmitForm) {
    this.popup = new Popup(popupElem);
    this.form = document.forms[formName];
    this.inputs = [...this.form.querySelectorAll('input')];
    this.button = this.form.querySelector('button[type="submit"]');

    this.getValues = () => {
        return this.inputs.reduce((acc, input) => {
            return {...acc, [input.name]: input.value};
        }, {});
    };

    this.setValues = (userData) => {
        Object.keys(userData).forEach((key) => {
            this.form[key].value = userData[key];
        });
    };

    this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        cbSubmitForm(this.getValues());
        this.form.reset();
        this.popup.close();
    });
    
    return Object.create(this.popup, {
        setValues: {
            value: this.setValues,
        },
    });
}