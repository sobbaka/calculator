let firstNum = "0";
let secondNum = null;
let result = null;
let operation = null;
let switcher = false;
const regex = /[0-9]|dot/

const screenInput = document.querySelector(".screen__input");
const screenResult = document.querySelector(".screen__result");
const btnList = Array.from(document.querySelectorAll(".btn"));

const operations = ["division", "multiple", "minus", "plus"];
const actions = ["reset", "del"];


for (const btn of btnList) {
  btn.addEventListener("click", function () {

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
          console.log('del')
          switch (switcher) {
            case true:
              secondNum = del(secondNum);
              console.log(`secondNum ${secondNum}`)
              break;
            case false:
              firstNum = del(firstNum);
              console.log(`fisrtnum ${firstNum}`)
              break;
          }
      }
    };

    if (regex.test(btn.value)) {
      if (switcher) {
        secondNum = createNum(secondNum, btn.value);
        console.log(`secondNum ${secondNum}`);
      } else {
        firstNum = createNum(firstNum, btn.value);
        console.log(`fisrtnum ${firstNum}`);
      }
    }
    if (btn.value === "equal") {
      equal();
    }
  })
}


const equal = () => {
  console.log(`fisrtnum ${firstNum}; secondNum ${secondNum}`);
  result = (operation && secondNum) ? action(operation, firstNum, secondNum) : firstNum;
  firstNum = result;
  secondNum = null;
  operation = null;
  console.log(result)
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
    default: // regex ??
      number = (number == "0") ? String(value) : number + String(value);
      break;
  }
  return number;
}

const reset = () => {
  firstNum = "0";
  secondNum = null;
  operation = null;
  switcher = false;
}

const del = (number) => {
  number = number.length > 1 ? number.slice(0, -1) : 0;
  return number;
}
