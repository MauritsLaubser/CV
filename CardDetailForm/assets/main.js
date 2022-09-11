// ERROR DIVS
const cardNameError = document.getElementById("card-name-error");
const cardNumberError = document.getElementById("card-number-error");
const cardCVCError = document.getElementById("card-cvc-error");
const cardDateError = document.getElementById("card-date-error");
// INPUT FORM
const inputForm = document.getElementById("input-form");
// INPUT FIELDS
const cardName = document.getElementById("CARDHOLDERNAME");
const cardNumber = document.getElementById("CARDNUMBER");
const cardCVC = document.getElementById("CARDCVC");
const cardMonth = document.getElementById("CARDMONTH");
const cardYear = document.getElementById("CARDYEAR");
// CARD FIELD
const nameField = document.getElementById("card-name");
const numberField = document.getElementById("card-number");
const dateField = document.getElementById("card-date");
const cvcField = document.getElementById("card-cvc");

inputForm.onsubmit = function (event) {
  event.preventDefault();
  if (checkErrors()) {
    console.log({
      cardName: cardName.value,
      cardNumber: cardNumber.value,
      cardDate: cardMonth.value + "/" + cardYear.value,
      cardCVC: cardCVC.value,
    });
  }
};

cardName.oninput = () => {
  nameField.innerHTML =
    cardName.value.trim() !== "" ? cardName.value : "Name Surname";
};

cardNumber.oninput = (event) => {
  //   cardNumber.vaue = cardNumber.value.trim();
  if (event.inputType === "deleteContentBackward") {
    if (
      cardNumber.value.length === 5 ||
      cardNumber.value.length === 10 ||
      cardNumber.value.length === 15
    ) {
      cardNumber.value = cardNumber.value.substring(
        0,
        cardNumber.value.length - 1
      );
      numberField.innerHTML =
        cardNumber.value.trim() !== ""
          ? cardNumber.value
          : "0000 0000 0000 0000";
    }
  } else {
    if (
      cardNumber.value.length === 4 ||
      cardNumber.value.length === 9 ||
      cardNumber.value.length === 14
    ) {
      cardNumber.value = cardNumber.value + " ";
      numberField.innerHTML =
        cardNumber.value.trim() !== ""
          ? cardNumber.value + " "
          : "0000 0000 0000 0000";
    } else {
      if (
        (cardNumber.value.length === 5 ||
          cardNumber.value.length === 10 ||
          cardNumber.value.length === 15) &&
        event.date !== " "
      ) {
        cardNumber.value =
          cardNumber.value.substring(0, cardNumber.value.length - 1) +
          " " +
          event.data;
        numberField.innerHTML =
          " " + cardNumber.value.trim() !== ""
            ? cardNumber.value
            : "0000 0000 0000 0000";
      } else {
        numberField.innerHTML =
          cardNumber.value.trim() !== ""
            ? cardNumber.value
            : "0000 0000 0000 0000";
      }
    }
  }
};

cardCVC.oninput = () => {
  cvcField.innerHTML = cardCVC.value.trim() ? cardCVC.value : "000";
};

function dateChange() {
  let month = cardMonth.value.trim();
  if (month.length === 1) month = "0" + month;
  let year = cardYear.value.trim();
  if (year.length === 1) year = "0" + year;
  dateField.innerHTML =
    (month !== "" ? month : "00") + "/" + (year !== "" ? year : "00");
}

function dateFocusLost() {
  let month = cardMonth.value.trim();
  if (month.length === 1) month = "0" + month;
  let year = cardYear.value.trim();
  if (year.length === 1) year = "0" + year;
  cardMonth.value = month;
  cardYear.value = year;
}

cardMonth.oninput = dateChange;
cardYear.oninput = dateChange;
cardMonth.onblur = dateFocusLost;
cardYear.onblur = dateFocusLost;

addClassName(cardNameError, "none");
addClassName(cardNumberError, "none");
addClassName(cardCVCError, "none");
addClassName(cardDateError, "none");

function addClassName(element, newClassName) {
  element.className = element.className + " " + newClassName;
}

function removeClassName(element, removedClassName) {
  element.classList.remove(removedClassName);
}

function checkErrors() {
  let numberCheck = checkRegex(
    cardNumber.value,
    /[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}/
  );
  let nameCheck =
    cardName.value.trim().length !== 0 ??
    checkRegex(cardName.value, /^([ \u00c0-\u01ffa-zA-Z'\-])+$/);
  let cvcCheck = checkRegex(cardCVC.value, /[0-9]{3}/);
  let dateCheck =
    checkRegex(cardMonth.value, /^((0[1-9])|(1[0-2]))$/) &&
    checkRegex(cardYear.value, /[0-9]{2}/);
  cvcCheck
    ? addClassName(cardCVCError, "none")
    : removeClassName(cardCVCError, "none");
  numberCheck
    ? addClassName(cardNumberError, "none")
    : removeClassName(cardNumberError, "none");
  dateCheck
    ? addClassName(cardDateError, "none")
    : removeClassName(cardDateError, "none");
  nameCheck
    ? addClassName(cardNameError, "none")
    : removeClassName(cardNameError, "none");
  if (!cvcCheck) {
    console.log("cvc wrong");
    if (dateCheck) {
      console.log("CVC not date");
      removeClassName(cardDateError, "none");
      cardDateError.children[0].innerHTML = "";
    } else {
      removeClassName(cardDateError, "none");
      cardDateError.children[0].innerHTML = "Invalid Date";
    }
  }
  return numberCheck && nameCheck && cvcCheck && dateCheck;
}

function checkRegex(input, regex) {
  return regex.test(input);
}
