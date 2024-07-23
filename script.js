// Functions for basic arithmetic operations
function add(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b !== 0) {
    return a / b;
  } else {
    return "";
  }
}

// Function to calculate sine (input in degrees)
function sin(degrees) {
  const radians = degrees * (Math.PI / 180);
  return Math.sin(radians).toFixed(4);
}

// Function to calculate tangent (input in degrees)
function tan(degrees) {
  const radians = degrees * (Math.PI / 180);
  return Math.tan(radians).toFixed(4);
}

// Function to calculate cosine (input in degrees)
function cos(degrees) {
  const radians = degrees * (Math.PI / 180);
  return Math.cos(radians).toFixed(4);
}

// // Function to calculate natural logarithm (base e)
// function log(a) {
//   return Math.log(a);
// }

// Function to calculate logarithm base 10
function log10(a) {
  return Math.log10(a);
}

// Function to calculate square root
function sqrt(a) {
  return Math.sqrt(a);
}

// Function to calculate square
function square(a) {
  return a * a;
}

// Function to calculate cube
function cube(a) {
  return a * a * a;
}

// Create variables to hold the parts of the operation
let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let displayValue = "";
let currentFunction = "";

// Function to update the display
function updateDisplay() {
  const displayElement = document.getElementById("paragraph");
  displayElement.textContent = displayValue;
}

// Add event listeners to number buttons
const numberButtons = document.querySelectorAll(".btn");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();
    if (value.match(/[0-9]/) || value === ".") {
      if (currentFunction) {
        firstNumber += value;
        displayValue += value;
      } else {
        if (currentOperator) {
          secondNumber += value;
        } else {
          firstNumber += value;
        }
        displayValue += value;
      }
      updateDisplay();
    } else if (
      value === "sin" ||
      value === "tan" ||
      value === "cos" ||
      value === "x²" ||
      value === "√" ||
      value === "x³" ||
      value === "log"
    ) {
      currentFunction = value;
      displayValue += ` ${value} `;
      updateDisplay();
    }
  });
});

// Add event listener to the decimal button
const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", () => {
  if (currentFunction) {
    if (!firstNumber.includes(".")) {
      firstNumber += ".";
      displayValue += ".";
    }
  } else {
    if (currentOperator) {
      if (!secondNumber.includes(".")) {
        secondNumber += ".";
        displayValue += ".";
      }
    } else {
      if (!firstNumber.includes(".")) {
        firstNumber += ".";
        displayValue += ".";
      }
    }
  }
  updateDisplay();
});

// Function to clear the display and reset variables
function clearDisplay() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  currentFunction = "";
  displayValue = "";
  updateDisplay();
}

// Add event listener to the delete button
const delButton = document.getElementById("del-button");
delButton.addEventListener("click", clearDisplay);

// Add event listener to the backspace button
const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", () => {
  if (displayValue) {
    displayValue = displayValue.slice(0, -1);
    if (currentFunction) {
      if (firstNumber) {
        firstNumber = firstNumber.slice(0, -1);
      } else {
        currentFunction = "";
      }
    } else if (currentOperator) {
      if (secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
      } else {
        currentOperator = "";
      }
    } else {
      firstNumber = firstNumber.slice(0, -1);
    }
    updateDisplay();
  }
});

// Select all elements with the class "operator" and store them in operatorButtons
const operatorButtons = document.querySelectorAll(".operator");

// Iterate over each button in the NodeList operatorButtons
operatorButtons.forEach((button) => {
  // Add a click event listener to each operator button
  button.addEventListener("click", () => {
    // Check if there is no current operator selected
    if (!currentOperator) {
      // Set the current operator to the text content of the clicked button
      currentOperator = button.textContent;
      // Append the operator to the display value with spaces around it
      displayValue += ` ${currentOperator} `;
    } else if (secondNumber) {
      // If there is already a second number, perform the operation
      const result = operate(
        currentOperator,
        parseFloat(firstNumber),
        parseFloat(secondNumber)
      );
      // Update firstNumber with the result of the operation
      firstNumber = result.toString();
      // Reset secondNumber to an empty string
      secondNumber = "";
      // Update the current operator to the text content of the clicked button
      currentOperator = button.textContent;
      // Update the display value with the result and the new operator
      displayValue = `${firstNumber} ${currentOperator} `;
    } else {
      // If there is no second number yet, just update the operator
      currentOperator = button.textContent;
      // Update the display value, replacing the last character (operator) with the new one
      displayValue = displayValue.slice(0, -3) + ` ${currentOperator} `;
    }
    // Update the display to show the current state
    updateDisplay();
  });
});

// Function to evaluate the expression
function evaluate() {
  if (currentFunction && firstNumber) {
    let result;
    switch (currentFunction) {
      case "sin":
        result = sin(parseFloat(firstNumber));
        break;
      case "tan":
        result = tan(parseFloat(firstNumber));
        break;
      case "cos":
        result = cos(parseFloat(firstNumber));
        break;
      case "√":
        result = sqrt(parseFloat(firstNumber));
        break;
      case "x²":
        result = square(parseFloat(firstNumber));
        break;
      case "x³":
        result = cube(parseFloat(firstNumber));
        break;
        case "log":
            result = log10(parseFloat(firstNumber));
            break;
      default:
        result = "";
    }
    displayValue = result.toString();
    firstNumber = result.toString();
    secondNumber = "";
    currentOperator = "";
    currentFunction = "";
    updateDisplay();
  } else if (firstNumber && currentOperator && secondNumber) {
    const result = operate(
      currentOperator,
      parseFloat(firstNumber),
      parseFloat(secondNumber)
    );
    displayValue = result.toString();
    firstNumber = result.toString();
    secondNumber = "";
    currentOperator = "";
    updateDisplay();
  }
}

// Add event listener to the equal button
const equalButton = document.getElementById("equal-button");
equalButton.addEventListener("click", evaluate);

// Function to operate on two numbers based on the operator
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return minus(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}
