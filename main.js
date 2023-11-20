// All kinds of operations that are supported for this calculator
const operations = {
  '/': (op1, op2) => op1 / op2,
  'X': (op1, op2) => op1 * op2,
  '+': (op1, op2) => op1 + op2,
  '-': (op1, op2) => op1 - op2
};

// Methods of conversions for the calc values
const conversions = {
  '.': (value) => value + ".",
  '°': (value) => (value * (180 / Math.PI)).toString() + "°"
};

function performOperation(op1, op2, operation) {
  // Detects if the operation exist in the operations object
  if (operations.hasOwnProperty(operation)) {
    return operations[operation](op1, op2);
  }
  return op1; // Default to returning the first operand if operation is not recognized
}

function performConversion(value, conversion) {
  if (conversions.hasOwnProperty(conversion)) {
    return conversions[conversion](value);
  }
  return value; // Default to returning original value if conversion is not recognized
}

// Updates the value shown in the calculator output
function updateDisplay(value) {
  document.getElementById("output").innerText = value;
}

let outNumbers = "0"; // Output numbers
let currentOperation = null; // Save the operation to make
let storedValue = null; // Save the first value/op before the operation

function handleNumber(buttonValue) {
  outNumbers = outNumbers === "0" ? buttonValue : outNumbers + buttonValue;
  updateDisplay(outNumbers);
}

function handleDelete() {
  if (outNumbers.length > 1) {
    outNumbers = parseFloat(outNumbers.slice(0, -1)).toString();
  } else {
    // Show a pop-up or handle the case where the operation is not possible
    console.log("NAIN");
  }
  updateDisplay(outNumbers);
}

function handleArithmeticOperation(operation) {
  if (storedValue === null) {
    storedValue = parseFloat(outNumbers);
    currentOperation = operation;
    outNumbers = "0";
  } else {
    storedValue = performOperation(storedValue, parseFloat(outNumbers), currentOperation);
    currentOperation = operation;
    outNumbers = "0";
  }
}

function handleOperation(operation) {
  if (operation === "=") {
    // Gives the result if the 2 op and the operation were inserted
    if (currentOperation && storedValue !== null) {
      const result = performOperation(storedValue, parseFloat(outNumbers), currentOperation);
      outNumbers = result.toString();
      updateDisplay(outNumbers);
      storedValue = null;
      currentOperation = null;
    }
  } else if (operation === "AC") {
    // Clear everything
    outNumbers = "0";
    storedValue = null;
    currentOperation = null;
    updateDisplay(outNumbers);
  } else if (operation === "C") {
    // Deletes/Clear the last digit
    handleDelete();
  } else if (operation === "." || operation === "°") {
    // Convert and show the number converted
    outNumbers = performConversion(outNumbers, operation);
    updateDisplay(outNumbers);
  } else {
    handleArithmeticOperation(operation);
  }
}

// Calculator web buttons event
document.querySelector(".calculator").addEventListener("click", (event) => {
  if (event.target.classList.contains("calculator-val")) {
    // Handle number button click
    const buttonValue = event.target.value;
    handleNumber(buttonValue);
  } else if (event.target.classList.contains("calculator-op")) {
    // Handle operation button click
    const operation = event.target.id;
    handleOperation(operation);
  }
});

// Calculator keyboard events
document.addEventListener("keydown", (event) => {
  let key = event.key;

  if (!isNaN(key)) {
    handleNumber(key);
  } else if (key === "°" || key === "." || key === "=" || key === "Enter" || key === "Escape" || key in operations) {
    if(key === "Enter")
      key = "=";
    else if (key === "Escape")
      key = "AC";

    handleOperation(key);
  }  else if (key === "Backspace") {
    handleBackspace();
  }
});