function add(num1, num2) {
    return num1 + num2; 
}

function subtract(num1, num2) {
    return num1 - num2; 
}

function multiply(num1, num2) {
    return num1 * num2; 
}

function divide(num1, num2) {
    return num1 / num2; 
}

function operate(num1, opt, num2) {
    if (opt === '+') return add(num1, num2);
    else if (opt === '-') return subtract(num1, num2);
    else if (opt === '*') return multiply(num1, num2);
    else if (opt === '/') return divide(num1, num2);
    else { 
        alert('ERROR');
        document.location.reload(true);
    }
}

const numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const buttons = document.querySelectorAll('button');
let displayValue = document.querySelector('.result-display');
let firstNumber = 0;
let nextNumber = 0;
let operator = '';
let queue = [firstNumber];

const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('CLEAR'); 

clearBtn.addEventListener("click", () => {
    queue.length = 0;
    firstNumber = 0;
    nextNumber = 0;
    operator = '';
    queue = [firstNumber];
    displayValue.textContent = 0; 
})

equalBtn.addEventListener("click", () => {
    const result = operate(queue[0], queue[1], queue[2]);
    displayValue.textContent = result; 
    queue.length = 0; 
    firstNumber = 0;
    nextNumber = 0;
    queue[0] = result;
})

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // If the value of button in number list: 
        if (button.textContent in numList) {
            if (typeof(queue[queue.length - 1]) === 'number' && queue.length === 1) {
                firstNumber = firstNumber * 10 + Number(button.textContent);
                displayValue.textContent = firstNumber; 
                queue.pop();
                queue.push(firstNumber)
            }
            else {
                if (typeof(queue[queue.length - 1]) !== 'number'){
                    queue.push(nextNumber);
                }   
                nextNumber = nextNumber * 10 + Number(button.textContent);
                displayValue.textContent = nextNumber; 
                queue.pop(); 
                queue.push(nextNumber);
            }
        }
        else {
            if (button.textContent !== '=' && button.textContent !== 'CLEAR') {
                operator = button.textContent;
                if (typeof(queue[queue.length - 1]) === 'number') {
                    queue.push(operator);
                }
            }
        }
        console.log(queue);
}
    )
});