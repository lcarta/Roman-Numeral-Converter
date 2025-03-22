const inputNumber = document.getElementById("number");
const converterBtn = document.getElementById("converter-btn");
const outputContainer = document.getElementById("output-container");
const outputResult = document.getElementById("output");
let isError = false;


const romanSymbols = ["I", "V", "X", "L", "C", "D", "M"]
let arrDecimalNumber = []
let index = 0;


const convertNumbers = () => {
  outputResult.innerText = ""
  let arrRomanNumber = ""
  arrDecimalNumber = inputNumber.value.split("");
  index = arrDecimalNumber.length;
  for (i = 0; i <= arrDecimalNumber.length - 1; i++) {
    arrRomanNumber += addSymbol(parseInt(arrDecimalNumber[i]));
    index--;
  }
  console.log(arrRomanNumber)
  return arrRomanNumber
}

const getIndexRomanSymbols = () => {
  if (index === 1) {
    return 0
  } else if (index === 2) {
    return 2
  } else if (index === 3) {
    return 4
  } else return 6
}

const addSymbol = (num) => {
  if (num === 0) {
    return ""
  } else if (num >= 1 && num <= 3) {
    return romanSymbols[getIndexRomanSymbols()].repeat(num);
  } else if (num === 4) {
    return romanSymbols[getIndexRomanSymbols()] + romanSymbols[getIndexRomanSymbols() + 1]
  } else if (num === 5) {
    return romanSymbols[getIndexRomanSymbols() + 1]
  } if (num >= 6 && num <= 8) {
    return romanSymbols[getIndexRomanSymbols() + 1] + romanSymbols[getIndexRomanSymbols()].repeat(num - 5);
  } else if (num === 9) {
    return romanSymbols[getIndexRomanSymbols()] + romanSymbols[getIndexRomanSymbols() + 2]
  }

}


const inputControl = (input) => {
  isError = false;
  if (input.match(/[e.]/g) || !input) {
    isError = true;
    insertOutputValue("Please enter a valid number");
  }
  else if (input < 1) {
    isError = true;
    insertOutputValue("Please enter a number greater than or equal to 1");
  } else if (input > 3999) {
    isError = true;
    insertOutputValue("Please enter a number less than or equal to 3999");
  } else { insertOutputValue(convertNumbers()) }
}


const insertOutputValue = (text) => {
  if (isError) {
    outputContainer.classList.remove("hidden");
    outputContainer.classList.add("output-error");
    setTimeout(() => { outputContainer.classList.add("hidden"); }, 3000)
  } else {
    outputContainer.classList.remove("hidden");
    outputContainer.classList.remove("output-error");
  }
  outputResult.innerText = (text);
  return
}

converterBtn.addEventListener('click', () => {
  inputControl(inputNumber.value);
})

inputNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    insertOutputValue();
  }
})