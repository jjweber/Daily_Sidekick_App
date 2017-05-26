// Creating variables
const submit = document.getElementById('sendBtn');
const form = document.getElementById('contactForm');
const nameField = document.getElementById('inputName');
const emailField = document.getElementById('inputEmail');
const messageField = document.getElementById('formMessage');

var error = document.querySelector('.error');


// Creating my validity class
class CheckValidity {
  constructor(input, type) {
    this.input = input;
    this.type = type;
    this.errors = [];
  };

  // Creating function to give me the current number of errors.
  currentErrorCount() {
    return this.errors.length;
  }

  // Creating function to push my messages to the errors array
  addError(message) {
    this.errors.push(message);
  };

  // Creating error messages
  getMessages() {
    const status = this.input.validity;

    if (status.valueMissing) {
      this.addError('This field is required to submit');
    }

    if (status.typeMismatch) {
      this.addError('Entry does not match the field type');
    }

    if (status.tooLong) {
      this.addError('Entry is too long');
    }

    // Modified message to show the remaining number of letters needed to validate.
    if (status.tooShort) {
      let minLength = this.input.minLength;
      let currentInputLength = this.input.value.length;
      let charsNeededForMin = minLength - currentInputLength;
      let errorText = charsNeededForMin + " more characters needed. ";

      errorText += "Entry is too short";


      this.addError(errorText);
    }

    if (this.type == "name" && !this.input.value.match(/[A-Z]/g)) {
      this.addError('Must contain at least one uppercase letter');
    }

    return this.errors;
  }

};

// Creating function to do all validity checks on all fields to prevent repetition
function validateField(input, type) {
  let validateName = new CheckValidity(input, type);

  // Finding the div for each input and searching for all elements with the class of error
  let errorElements = input.parentNode.getElementsByClassName("error");
  let errorMessages = validateName.getMessages();
  let currentErrorCount = errorElements.length;

  // Keep removing error elements until they are all gone.
  while (errorElements.length > 0) {
    errorElements[0].parentNode.removeChild(errorElements[0]);
  }

  // looping through array and adding the messages
  errorMessages.forEach( (err) => {
    input.insertAdjacentHTML('afterend', '<p class="error">' + err + '</p>');
  });
}

function checkForValidForm() {
  let validForm = true;

  // force validation on each of the fields
  validateField(nameField, "name");
  validateField(emailField, "email");
  validateField(messageField, "text");

  let errorElements = document.getElementsByClassName("error");
  if(errorElements.length) validForm = false;

  return validForm;
}


// Creating function that passes each input to my clearfield function and resets the form.
function resetform() {
  clearField(nameField);
  clearField(emailField);
  clearField(messageField);
}

// Creating function that takes in an input and resets it to null or default
function clearField(input) {
  input.value = '';

  // Finding the div for each input and searching for all elements with the class of error
  let errorsToClear = document.getElementsByClassName("error");
  let currentErrorCount = errorsToClear.length;

  // Keep removing error elements until they are all gone.
  while (errorsToClear.length > 0) {
    errorsToClear[0].parentNode.removeChild(errorsToClear[0]);
  }
}


// Setting up my event listeners

// Using keyup events so it will re-validate as user types giving them live feedback

// nameField events
nameField.addEventListener("keyup", (event) => {
  validateField(nameField, "name");
}, false);

// emailField events
emailField.addEventListener("keyup", (event) => {
  validateField(emailField, "email");
}, false);

// emailField events
messageField.addEventListener("keyup", (event) => {
  validateField(messageField, "text");
}, false);

// Setting up submit onclick listener
submit.addEventListener("click", (event) => {
  event.preventDefault(); // this will stop the standard form submission.

  // Doing a validity check on the click event and showing errors if they exist
  // Returns true if the form was valid
  if (checkForValidForm()) {
    // Finding the form div id and replacing the inner Html with my html for the registration success message
    document.getElementById('formBeforeSuccess').innerHTML = document.getElementById('formAfterSuccess').innerHTML;
  }
});
