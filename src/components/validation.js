const showError = ({ form, inputElement, errorMessage, inputErrorClass, errorClass }) => {
    const errorSpan = form.querySelector(`.${inputElement.name}-error`);

    errorSpan.textContent = errorMessage;
    errorSpan.classList.add(errorClass);

    inputElement.classList.add(inputErrorClass);
};

const hideError = ({ form, inputElement, inputErrorClass, errorClass }) => {
    const errorSpan = form.querySelector(`.${inputElement.name}-error`);

    errorSpan.classList.remove(errorClass);
    errorSpan.textContent = '';

    inputElement.classList.remove(inputErrorClass);
};

const checkInputValidity = ({ form, inputElement, inputErrorClass, errorClass }) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
    
    if (!inputElement.validity.valid) {
        showError({
            form,
            inputElement,
            errorMessage: inputElement.validationMessage,
            inputErrorClass,
            errorClass,
        });
    } else {
        hideError({
            form,
            inputElement,
            inputErrorClass,
            errorClass,
        });
    }
};

const hasInvalidInput = (inputs) => {
    return inputs.some((input) => !input.validity.valid);
};

const toggleButtonState = ({ inputs, submitButton, inactiveButtonClass }) => {
    if (hasInvalidInput(inputs)) {
        submitButton.disabled = true;
        submitButton.classList.add(inactiveButtonClass);
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove(inactiveButtonClass);
    }
};

const setEventListeners = ({
    form,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const submitButton = form.querySelector(submitButtonSelector);

    toggleButtonState({
        inputs,
        submitButton,
        inactiveButtonClass,
    });

    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity({
                form,
                inputElement,
                inputErrorClass,
                errorClass,
            });
            toggleButtonState({
                inputs,
                submitButton,
                inactiveButtonClass,
            });
        });
    });
};

const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));

    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        setEventListeners({
            form,
            inputSelector,
            submitButtonSelector,
            inactiveButtonClass,
            inputErrorClass,
            errorClass,
        });
    });
};

const clearValidation = (
    form,
    { submitButtonSelector, inputSelector, inactiveButtonClass, inputErrorClass, errorClass }
) => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const submitButton = form.querySelector(submitButtonSelector);

    inputs.forEach((inputElement) => {
        hideError({
            form,
            inputElement,
            inputErrorClass,
            errorClass,
        });
    });

    toggleButtonState({
        inputs,
        submitButton,
        inactiveButtonClass,
    });
};

export { enableValidation, clearValidation };