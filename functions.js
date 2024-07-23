export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}
export function divide(a, b) {
  return a / b;
}
export function multiply(a, b) {
  return a * b;
}
export function operation(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "/") {
    return a / b;
  } else if (operator === "*") {
    return multiply(a, b);
  } else {
    return "";
  }
}
