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

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return minus(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    } else {
        return "";
    }
}

// Create variables to hold the parts of the operation
let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let displayValue = "";

// Function to update the display
function updateDisplay() {
    const displayElement = document.getElementById("paragraph");
    displayElement.textContent = displayValue;
}

// Add event listeners to number buttons
const numberButtons = document.querySelectorAll(".btn");
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // If an operator has been selected, update the second number
        if (currentOperator) {
            secondNumber += button.textContent;
        } else {
            firstNumber += button.textContent;
        }
        displayValue += button.textContent;
        updateDisplay();
    });
});

// Add event listener to the decimal button
const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", () => {
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
    updateDisplay();
});

// Function to clear the display and reset variables
function clearDisplay() {
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
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
        if (currentOperator) {
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
            displayValue = displayValue.slice(0, -1) + ` ${currentOperator} `;
        }
        // Update the display to show the current state
        updateDisplay();
    });
});

// Function to evaluate the expression
function evaluate() {
    if (firstNumber && currentOperator && secondNumber) {
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
