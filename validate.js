let errorMessage = ""; // Variabel för att lagra felmeddelanden
const successMessage = "Success";
const errorFields = [];

let firstName = "";
let lastName = "";
let email = "";
let password = "";


const messageContainer = document.getElementById("message");

const minimumLength = 2;
const maximumLength = 20;

function reset() {
    errorMessage = "";
    messageContainer.innerHTML = "";
    errorFields.length = 0;
}

function showMessage(message) {
    messageContainer.innerHTML = message;
    messageContainer.classList.remove("d-none");
    console.log(errorFields)
    errorFields.map((el) => {
        console.log(el);
    })
}

function hideMessage() {
    messageContainer.classList.add("d-none");
}

function buildErrorMessage(message, fieldId) {
    errorFields.push(fieldId);
    errorMessage += message + "<br />";
}

const isEmpty = function(value) {
    if (value.length === 0) {
        return true;
    } else {
        return false;
    }
}

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
    return re.test(password);
};

const ischeckBoxValed = (terms) => {
    const re = document.querySelector('terms')
    return re.checked(terms);

};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isNameValid = (value) => {
    const re = ((/^[a-zA-Z]*$/));
    return re.test(value);
};

const checkName = (value, fieldName, fieldId) => {
    if (isEmpty(value)) {
        buildErrorMessage(`${fieldName} får inte vara tomt.`, fieldId);
    } else if (value.length < minimumLength || value.length > maximumLength) {
        buildErrorMessage(`${fieldName} måste ligga mellan ${min} och ${max} bokstäver.`, fieldId);
    } else if (!isNameValid(value)) {
        buildErrorMessage(`${fieldName} får inte innehålla sifror!`, fieldId);
    }
};

const checkEmail = (email) => {
    if (isEmpty(email)) {
        buildErrorMessage('E-post får inte vara tomt.', 'email');
    } else if (!isEmailValid(email)) {
        buildErrorMessage('E-post är inte giltig.', 'email');
    }
};

const acceptedTermsAndConditions = () => {
    const checked = document.getElementById('terms').checked;
    if (!checked) {
        buildErrorMessage('Vänligen acceptera villkoren.', 'terms');
    }
};

const checkPassword = () => {
    password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("repeatPassword").value.trim();

    if (isEmpty(password)) {
        buildErrorMessage('Lösenord kan inte vara tomt.', 'password');
    } else if (!isPasswordSecure(password)) {
        buildErrorMessage(`Lösenord måste bestå av minst 8 tecken varav minst 1 måste vara en gemen bokstav och minst 1 måste vara en versal bokstav. Det måste även innehålla minst 1 heltal och ett av specialtecknen (!@#$%^&*)`, 'password');
    }
    if (isEmpty(confirmPassword)) {
        buildErrorMessage('Var vänlig skriv in lösenordsbekräftelse igen.', "repeatPassword");
    } else if (password !== confirmPassword) {
        buildErrorMessage('Lösenorden matchar inte.', "repeatPassword");
    }
};

function createAndShowUserObject() {
    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }
    console.log(user);
    console.log("Success");
}

function validate() {
    reset();
    firstName = document.getElementById("firstName").value.trim();
    lastName = document.getElementById("lastName").value.trim();
    email = document.getElementById("email").value.trim();
    checkName(firstName, "Förnamn", "firstName");
    checkName(lastName, "Efternamn", "lastName");
    checkEmail(email);
    checkPassword();
    acceptedTermsAndConditions();

    if (errorMessage.length > 0) { // Om det finns några fel
        errorMessage = "<h3>Följande fel inträffade:</h3>" + errorMessage;
        showMessage(errorMessage);
        messageContainer.classList.remove("successMessage");
        messageContainer.classList.add("errorMessage");
    } else { // Annars
        showMessage(successMessage);
        messageContainer.classList.remove("errorMessage");
        messageContainer.classList.add("successMessage");
        createAndShowUserObject();
    }
}

document.getElementById("validationForm").addEventListener('submit', function(e) {
    // prevent the form from submitting
    e.preventDefault();
    validate();
});