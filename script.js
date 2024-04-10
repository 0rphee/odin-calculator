function addOp(x, y) {
  return x + y;
}

function substractOp(x, y) {
  return x - y;
}

function multiplyOp(x, y) {
  return x * y;
}

function divideOp(x, y) {
  return x / y;
}

function negateOp(x) {
  return -1 * x;
}

function percentageOp(x) {
  return x / 100;
}

function isOperator(str) {
  return str === "+" || str === "-" || str === "*" || str === "/"
    ? true
    : false;
}

function returnOp(str) {
  // mono op = true, bi op = false
  switch (str) {
    case "+":
      return [false, addOp];
    case "-":
      return [false, substractOp];
    case "*":
      return [false, multiplyOp];
    case "/":
      return [false, divideOp];
    case "+/-":
      return [true, negateOp];
    case "%":
      return [true, percentageOp];
    default:
      return [null, null];
  }
}

let firstVal = null;
let secondVal = null;
let currentOperation = null;
let replaceText = false; // used when sequencing operations
let lastPressedOp = null;

const buttons = document.querySelector(".buttons");
const contentDiv = document.querySelector(".text");

buttons.addEventListener("click", (e) => {
  // log state
  if (lastPressedOp) {
    // remove highlight of last pressed button operation
    lastPressedOp.classList.remove("lastOp");
  }

  if (e.target.textContent.length > 3) {
    // user pressed between buttons, do nothing
    return;
  } else if (e.target.textContent.length === 2) {
    // user pressed AC
    contentDiv.textContent = "0";

    firstVal = null;
    secondVal = null;
    currentOperation = null;

    console.log("ALERT AC");
  } else if (e.target.textContent === "=") {
    // user pressed 'equals'
    if (!(firstVal && secondVal && currentOperation)) {
      return console.log("ALERT INCOMPLETE VALUES (=)");
    }

    const result = currentOperation(firstVal, secondVal);

    firstVal = result;
    secondVal = null;
    currentOperation = null;
    replaceText = true;

    contentDiv.textContent = result;
  } else {
    const [isMonoOp, opFunc] = returnOp(e.target.textContent);

    if (opFunc) {
      // user pressed an operator
      lastPressedOp = e.target;
      lastPressedOp.classList.add("lastOp");

      if (isMonoOp) {
        const monoOpResult = opFunc(firstVal);
        firstVal = monoOpResult;
        contentDiv.textContent = monoOpResult;
        return;
      }

      replaceText = true;

      if (currentOperation) {
        if (firstVal && secondVal) {
          // sequence multiple operations without needing to use '='
          const result = currentOperation(firstVal, secondVal);

          firstVal = result;
          secondVal = null;
          contentDiv.textContent = result;
        }

        currentOperation = opFunc;
        return console.log("ALERT DOUBLE OPERATOR", e.target.text);
      }

      currentOperation = opFunc;
    } else {
      // user pressed a digit or the dot

      if (contentDiv.textContent === "0" || replaceText) {
        contentDiv.textContent = e.target.textContent;
        replaceText = false;
      } else if (
        e.target.textContent === "." &&
        !Number.isInteger(Number.parseFloat(contentDiv.textContent))
      ) {
        console.log("ALERT MORE THAN ONE (.) DECIMAL SEPARATOR");
        // do nothing
      } else {
        contentDiv.textContent += e.target.textContent;
      }

      if (firstVal === null || !currentOperation) {
        firstVal = Number.parseFloat(contentDiv.textContent);
        currentOperation == null;
      } else {
        secondVal = Number.parseFloat(contentDiv.textContent);
      }
    }
  }
  console.log(
    `v1: ${firstVal}\nv2: ${secondVal}\nop: ${currentOperation}\nrepText: ${replaceText}\nlastPressed: ${lastPressedOp}\n`,
  );
});
