function add(x, y) {
  return x + y;
}

function substract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(op, x, y) {
  return op(x, y);
}

function isAlpha(str) {
  let code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58)) {
      return false;
    }
  }

  return true;
}

let firstVal;
let secondVal;
let currentOperation;

const container = document.querySelector(".container");

container.addEventListener("click", (e) => {
  // if (e.target.textContent)
  console.log(e.target.textContent);
});
