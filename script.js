// Basic Math Functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Nope! Can't divide by 0 😎";
  }
  return a / b;
}

// Create Variables for Operation
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;

// Operate Function
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

// Display and Clear Logic
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector('[data-action="clear"]');
const equalButton = document.querySelector(".equal");

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.dataset.operator))
);
equalButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);

function appendNumber(number) {
  if (display.textContent === "0" || shouldResetScreen) {
    resetScreen();
  }
  display.textContent += number;
}

function resetScreen() {
  display.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
}

// Operate and evaulation logic
function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  if (currentOperator === "/" && display.textContent === "0") {
    display.textContent = "Nope! 🙅‍♂️";
    return;
  }
  secondNumber = display.textContent;
  display.textContent = roundResult(
    operate(currentOperator, firstNumber, secondNumber)
  );
  currentOperator = null;
}

function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}
