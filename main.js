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
const deleteBtn = document.getElementById('DELETE');

deleteBtn.addEventListener("click", () => {
    let lastElement = queue[queue.length - 1]; 
    if (typeof(lastElement) === 'number') {
        if (lastElement >= 0) {
            lastElement = Math.floor(lastElement / 10); 
            displayValue.textContent = lastElement; 
            queue.pop();
            queue.push(lastElement)
        }
        else {
            lastElement = Math.ceil(lastElement / 10); 
            displayValue.textContent = lastElement; 
            queue.pop();
            queue.push(lastElement)
        }
    }
    else {
        queue.pop();
    }
})


clearBtn.addEventListener("click", () => {
    queue.length = 0;
    firstNumber = 0;
    nextNumber = 0;
    operator = '';
    queue = [firstNumber];
    displayValue.textContent = 0; 
})

equalBtn.addEventListener("click", () => {
    if (queue.length < 3) {
        alert('Error - we need two operands for an operation.'); 
        document.location.reload(true);
    }
    const result = operate(queue[0], queue[1], queue[2]);
    displayValue.textContent = result; 
    // queue.length = 0;
    queue.splice(0, 2); 
    firstNumber = 0;
    nextNumber = 0;
    queue[0] = result;
})

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // If the value of button in number list: 
        let lastElement = queue[queue.length - 1]; 
        if (button.textContent in numList) {
            if (typeof(lastElement) === 'number' && queue.length === 1) {
                if (lastElement >= 0) {
                    lastElement = lastElement * 10 + Number(button.textContent);
                    displayValue.textContent = lastElement; 
                    queue.pop();
                    queue.push(lastElement)
                }
                else {
                    lastElement = Math.ceil(lastElement * 10) - Number(button.textContent);
                    displayValue.textContent = lastElement; 
                    queue.pop();
                    queue.push(lastElement)
                }
            }
            else {
                if (typeof(lastElement) !== 'number'){
                    queue.push(0);
                    lastElement = queue[queue.length - 1];
                }  
                lastElement = lastElement * 10 + Number(button.textContent);
                displayValue.textContent = lastElement; 
                queue.pop(); 
                queue.push(lastElement);
            }
        }
        else {
            if (button.textContent !== '=' && button.textContent !== 'CLEAR' 
                    && button.textContent != 'DELETE') {
                operator = button.textContent;
                if (typeof(queue[queue.length - 1]) === 'number' && queue.length == 1) {
                    queue.push(operator);
                }
                if (typeof(queue[queue.length - 1]) === 'number' && queue.length > 2){
                    const result = operate(queue[0], queue[1], queue[2]);
                    displayValue.textContent = result; 
                    queue.splice(0, 2); 
                    queue[0] = result;
                    queue.push(operator);
                }
            }
        }
        console.log(queue);
}
    )
});