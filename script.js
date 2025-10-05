document.addEventListener('DOMContentLoaded', () => {
  const display = document.querySelector('input');
  let currentInput = '';
  let operator = '';
  let previousInput = '';
  let expression = ''; // 🧮 Store full expression
  let resultShown = false;

  // 🔹 Update display
  function updateDisplay(value) {
    display.value = value;
  }

  // 🔹 Handle number input
  function handleNumber(number) {
    if (resultShown) {
      // Start a new calculation after result
      currentInput = '';
      expression = '';
      resultShown = false;
    }
    currentInput += number;
    updateDisplay(expression + currentInput);
  }

  // 🔹 Handle operator
  function handleOperator(op) {
    if (currentInput === '' && previousInput === '') return;

    if (previousInput !== '' && currentInput !== '') {
      calculate(false); // Intermediate calculation (no "=" yet)
    }

    operator = op;
    previousInput = currentInput || previousInput;
    expression = `${previousInput} ${operator} `;
    currentInput = '';
    updateDisplay(expression);
  }

  // 🔹 Perform calculation
  function calculate(showEqual = true) {
    if (previousInput === '' || currentInput === '') return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '/': result = current === 0 ? 'Error' : prev / current; break;
      case '%': result = (prev * current) / 100; break;
      default: return;
    }

    // 🧮 Show full expression on display
    if (showEqual) {
      expression = `${previousInput} ${operator} ${currentInput} = ${result}`;
      updateDisplay(expression);
    } else {
      expression = `${result} ${operator} `;
      updateDisplay(expression);
    }

    currentInput = result.toString();
    previousInput = '';
    operator = '';
    resultShown = true;
  }

  // 🔹 Clear everything
  function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    expression = '';
    resultShown = false;
    updateDisplay('0');
  }

  // 🔹 Delete last character
  function deleteLast() {
    if (resultShown) {
      clearDisplay();
      return;
    }
    currentInput = currentInput.slice(0, -1);
    updateDisplay(expression + currentInput || '0');
  }

  // 🔹 Handle decimal
  function handleDecimal() {
    if (resultShown) {
      currentInput = '0';
      expression = '';
      resultShown = false;
    }
    if (!currentInput.includes('.')) {
      currentInput += currentInput === '' ? '0.' : '.';
      updateDisplay(expression + currentInput);
    }
  }

  // 🔹 Event listeners for buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const value = button.textContent.trim();

      if (!isNaN(value)) {
        handleNumber(value);
      } else if (value === 'AC') {
        clearDisplay();
      } else if (value === 'DEL') {
        deleteLast();
      } else if (['+', '-', '*', '/', '%'].includes(value)) {
        handleOperator(value);
      } else if (value === '.') {
        handleDecimal();
      } else if (value === '=') {
        calculate(true);
      }
    });
  });

  // Set initial display
  updateDisplay('0');
});
