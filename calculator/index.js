document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('input');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    function updateDisplay(value) {
        display.value = value;
    }

    function handleNumber(number) {
        if (currentInput.length < 12) { // Limit input length for display
            currentInput += number;
            updateDisplay(currentInput);
        }
    }

    function handleOperator(op) {
        if (currentInput === '') return; // Prevent operator input if no number is entered
        if (operator !== '') calculate(); // If there's an operator, perform the calculation first
        previousInput = currentInput;
        operator = op;
        currentInput = '';
    }

    function calculate() {
        if (previousInput === '' || currentInput === '') return; // Prevent calculation if inputs are missing
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            case '%':
                result = (prev * current) / 100;
                break;
            default:
                return;
        }
        // Update display with result and reset inputs
        updateDisplay(result);
        currentInput = result.toString();
        previousInput = '';
        operator = '';
    }

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay(currentInput);
        }
    }

    // Event listeners for buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9') {
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
                calculate();
            }
        });
    });

});