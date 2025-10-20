// script.js
document.addEventListener("DOMContentLoaded", function () {
  const result = document.getElementById("result");
  const buttons = document.querySelectorAll(".btn");

  let currentInput = "";
  let operator = null;
  let previousInput = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.getAttribute("data-value");

      if (value === "C") {
        currentInput = "";
        previousInput = "";
        operator = null;
        result.value = "";
      } else if (value === "←") {
        let newInput = "";
        for (let i = 0; i < currentInput.length - 1; i++) {
          newInput += currentInput[i];
        }
        currentInput = newInput;
        result.value = currentInput;
      } else if (value === "=") {
        if (currentInput && previousInput && operator) {
          currentInput = calculate(previousInput, currentInput, operator);
          result.value = currentInput;
          previousInput = "";
          operator = null;
        }
      } else if (
        value === "+" ||
        value === "-" ||
        value === "×" ||
        value === "÷"
      ) {
        if (currentInput) {
          if (previousInput && operator) {
            currentInput = calculate(previousInput, currentInput, operator);
            result.value = currentInput;
          }
          previousInput = currentInput;
          currentInput = "";
          operator = value;
        }
      } else {
        currentInput += value;
        result.value = currentInput;
      }
    });
  });

  function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
      case "+":
        return (a + b).toString();
      case "-":
        return (a - b).toString();
      case "×":
        return (a * b).toString();
      case "÷":
        if (b === 0) {
          alert("Cannot divide by zero!");
          return "0";
        }
        return (a / b).toString();
      default:
        return b.toString();
    }
  }
});
