import errorIcon from "/icons/error-icon.png";

const form = document.querySelector('form');
const password = document.getElementById('password');
const passwordConfirmation = document.getElementById('password-confirmation');

const inputs = document.querySelectorAll('input');

passwordConfirmation.addEventListener('blur', () => {
    if (passwordConfirmation.value !== password.value) {
      passwordConfirmation.setCustomValidity("Passwords don't match");
    } else {
      passwordConfirmation.setCustomValidity("");
    }
  });

inputs.forEach(input => {
    input.addEventListener('blur', (event) => {
        const error = document.querySelector(`.error[data-type="${input.name}"]`)
        
        if (input.value) {
            if (input.validity.valid) {
                error.textContent = '';
                error.className = 'error';
            } else {
                showError(input);
            }
        } else {
            error.textContent = '';
            error.className = 'error';
        }
    });
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstInvalidInput = Array.from(inputs).find(input => !input.validity.valid);
    if (firstInvalidInput) {
        showError(firstInvalidInput);
        firstInvalidInput.focus();
    } else {
        formSubmit();
        form.reset();
    }
});

function showError(inputElement) {
    const error = document.querySelector(`.error[data-type="${inputElement.name}"]`);

    if (inputElement.validity.valueMissing) {
        error.textContent = `This field is required`;
    } else if (inputElement.validity.typeMismatch) {
        error.textContent = `Enter a valid ${inputElement.name}`;
    } else if (inputElement.validity.tooShort) {
        error.textContent = `Please enter at least ${inputElement.minLength} characters`;
    } else if (inputElement.validity.patternMismatch) {
        error.textContent = `Invalid ${inputElement.name}`;
    } else if (inputElement.name === 'password-confirmation') {
        error.textContent = inputElement.validationMessage;
    }

    appendErrorIcon(error);
    error.className = 'error active';
}

function appendErrorIcon(domElement) {
    const errorIconElement = document.createElement('img');
    errorIconElement.src = errorIcon;
    errorIconElement.alt = 'error-icon';
    errorIconElement.classList.add('error-icon');
    domElement.appendChild(errorIconElement);
}

function formSubmit() {
    console.log('Form Submited');
}