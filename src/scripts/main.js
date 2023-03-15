let firstNum = "0";
let secondNum = null;
let result = null;
let operation = null;
let switcher = false;
let zeroDivision = false;
const regex = /[0-9]|dot/

const screenInput = document.querySelector(".screen__input");
const screenResult = document.querySelector(".screen__result");
const btnList = Array.from(document.querySelectorAll(".btn"));

const operations = ["division", "multiple", "minus", "plus"];
const actions = ["reset", "del"];

screenInput.innerHTML = firstNum;

for (const btn of btnList) {
  btn.addEventListener("click", function () {

    if (zeroDivision) {
      reset();
      zeroDivision = false;
    }

    if (operations.includes(btn.value)) {
      if (operation) equal();
      operation = btn.value;
      switcher = true;
    }

    if (actions.includes(btn.value)) {
      switch (btn.value) {
        case "reset":
          reset();
        case "del":
          switch (switcher) {
            case true:
              secondNum = secondNum ? del(secondNum) : setResult();
              break;
            case false:
              firstNum = del(firstNum);
              break;
          }
      }
    };

    if (regex.test(btn.value)) {
      if (switcher) {
        secondNum = createNum(secondNum, btn.value);
      } else {
        firstNum = createNum(firstNum, btn.value);
      }
    }
    inputDisplay();

    if (btn.value === "equal") {
      equal();
    }
  })
}


const inputDisplay = () => {
  const secondNumHTML = secondNum ? secondNum : "";
  const operationHTML = operation ? textToSign(operation) : "";
  screenInput.innerHTML = `${firstNum}${operationHTML}${secondNumHTML}`
}


const textToSign = (operation) => {
  switch (operation) {
    case "plus":
      return " + ";
    case "minus":
      return " - ";
    case "multiple":
      return " X ";
    case "division":
      return " / ";
  }
}


const equal = () => {
  zeroDivision = checkZeroDivision(operation, secondNum);
  if (!zeroDivision) {
    result = (operation && secondNum) ? action(operation, firstNum, secondNum) : firstNum;
    result = `${result}`.length > 8 ? result.toExponential(2) : result;
    firstNum = result;
    secondNum = null;
    operation = null;
    console.log(result);
    screenResult.innerHTML = "= " + result;
  }
}


const action = (operation, numOne, numTwo) => {
  switch (operation) {
    case "plus":
      return parseFloat(numOne) + parseFloat(numTwo);
    case "minus":
      return parseFloat(numOne) - parseFloat(numTwo);
    case "multiple":
      return parseFloat(numOne) * parseFloat(numTwo);
    case "division":
      return parseFloat(numOne) / parseFloat(numTwo);
  }
}


const createNum = (number, value) => {
  number = number ? number : "0";
  switch (value) {
    case "0":
      number = (number != "0") ? number + String(value) : number;
      break;
    case "dot":
      number = (!number.includes(".")) ? number + "." : number;
      break;
    default:
      number = (number == "0") ? String(value) : number + String(value);
      break;
  }
  return number;
}


const checkZeroDivision = (operation, secondNum) => {
  if (secondNum == "0" && operation === "division") {
    screenResult.classList.add("screen__input_state_zero-division");
    screenResult.innerHTML = "На ноль делить нельзя";
    return true;
  };
  return false;
}


const reset = () => {
  if (screenResult.classList.contains("screen__input_state_zero-division")) screenResult.classList.remove("screen__input_state_zero-division");
  firstNum = "0";
  setResult();
  secondNum = null;
  operation = null;
  switcher = false;
  screenInput.innerHTML = firstNum;
  screenResult.innerHTML = "";
}


const setResult = () => {
  secondNum = null;
  operation = null;
  switcher = false;
  screenInput.innerHTML = firstNum;
  screenResult.innerHTML = "";
}


const del = (number) => {
  number = `${number}`.length > 1 ? `${number}`.slice(0, -1) : 0;
  return number;
}
