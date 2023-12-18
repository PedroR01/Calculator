// Max length of the values that the calculator can handle
const MAX_DIGITS = 8;
const DIG_OVERFLOW_ERR = "ERR: The operation would exceed the 8 maximum digits allowed.";
const MAX_DECIMAL_DIGITS = 3; // When has a +1 in a condition, it refers to the "."(dot) added in the string.

// constructor for the operators that the calculator is going to handle. 
function Operator(value, isDecimal){
  this.value = value;
  this.isDecimal = isDecimal;
}

// All kinds of operations that are supported for this calculator
const operations = {
  '/': (op1, op2) => op1 / op2,
  'X': (op1, op2) => op1 * op2,
  '+': (op1, op2) => op1 + op2,
  '-': (op1, op2) => op1 - op2
};

// Methods of conversions for the calc values
const conversions = {
  '.': (value) => {
    if(!value.toString().includes("."))
      return value + ".";
    return value;
  },
  '°': (value) => (value * (180 / Math.PI)) + "°",
  'sign': (value) => value * -1 // +/-
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
function updateDisplay(number) {
  //document.getElementById("output").innerText = !number.isDecimal ? Number(number.value) : Number(number.value).toFixed(MAX_DECIMAL_DIGITS);
  let txt = Number(number.value);
  if(txt === NaN){ // ERROR AL INTENTAR MOSTRAR UN NUMERO TRANSFORMADO A RADIANES Y FALTARIA PODER HACERLO VOLVER A DECIMAL -- TO FIX
    txt = Number(txt.toString().slice(0, -1));
    console.log("KK");
  }
  document.getElementById("output").innerText = txt;
}

let currentValue = new Operator(0, false); // Current input digits/value
let currentOperation = null; // Save the operation to make
let storedValue = new Operator(null, false); // Save the first value/op before the operation

function reset(){
  storedValue.value = null;
  storedValue.isDecimal = false;
  currentOperation = null;
  currentValue.value = 0;
  currentValue.isDecimal = false;
}

function handleNumber(buttonValue) {
  if(currentValue.value === 0)
    currentValue.value = buttonValue;
  else if((currentValue.isDecimal && currentValue.value.toString().length <= (MAX_DIGITS + MAX_DECIMAL_DIGITS)) || currentValue.value.toString().length < MAX_DIGITS)
    currentValue.value += buttonValue;
  else
    alert(DIG_OVERFLOW_ERR);
  updateDisplay(currentValue);
}

function handleDelete() {
  if (currentValue.value.toString().length > 1) 
    currentValue.value = currentValue.value.slice(0, -1);
  else if(currentValue.value.toString().length = 1) 
    currentValue.value = 0;
  else {
    // Show a pop-up or handle the case where the operation is not possible
    alert("ERR: Cannot delete an empty string/value.");
  }
  updateDisplay(currentValue);
}

function handleArithmeticOperation(operation) {
  if (storedValue.value === null) {
    storedValue.value = currentValue.value; // Saves the current value and decimal status entered in another variable so we can access it later
    storedValue.isDecimal = currentValue.isDecimal;
  }
  else {
    result = performOperation(parseFloat(storedValue.value), parseFloat(currentValue.value), currentOperation).toFixed(MAX_DECIMAL_DIGITS);
    if (((storedValue.isDecimal || currentValue.isDecimal) && result.toString().length <= (MAX_DIGITS + MAX_DECIMAL_DIGITS + 1)) || result.toString().length <= MAX_DIGITS) {
      storedValue.value = result;
      updateDisplay(storedValue);
    } else {
      alert(DIG_OVERFLOW_ERR + " Arithmetic");
      // Reset values after an overflow
      reset();
      updateDisplay(currentValue);
      return;
    }
  }
  console.log(storedValue);

  currentOperation = operation;
  currentValue.value = 0;
  currentValue.isDecimal = false;
}

function handleOperation(operation) {
  if (operation === "=") {
    // Gives the result if the 2 op and the operation were inserted
    if ((currentOperation && storedValue.value) !== null) {
      console.log(storedValue);
      console.log(currentValue);
      const result = performOperation(parseFloat(storedValue.value), parseFloat(currentValue.value), currentOperation).toFixed(MAX_DECIMAL_DIGITS);
      console.log(result);
      if (((storedValue.isDecimal || currentValue.isDecimal) && result.toString().length <= (MAX_DIGITS + MAX_DECIMAL_DIGITS + 1)) || result.toString().length <= MAX_DIGITS) {
        currentValue.value = result;
        updateDisplay(currentValue);
        storedValue.value = currentValue.value;
        storedValue.isDecimal = currentValue.isDecimal;
        currentValue.value = 0;
        currentOperation = null;
      } else {
        alert(DIG_OVERFLOW_ERR);
        // Reset values after an overflow
        reset();
        updateDisplay(currentValue);
      }
    }
  } else if (operation === "AC") {
    // Clear everything
    reset();
    updateDisplay(currentValue);
  } else if (operation === "C") {
    // Deletes/Clear the last digit
    handleDelete();
  } else if (operation === "." || operation === "°" || operation === "sign") {
    // Convert and show the number converted
    currentValue.value = performConversion(parseFloat(currentValue.value), operation);
    if(operation != "sign")
      currentValue.isDecimal = true;
    updateDisplay(currentValue);
  } else {
    // Handles the operation received according to the previous value that was entered
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