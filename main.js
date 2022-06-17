//Global variables 
const numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const buttons = document.querySelectorAll('button');
let displayValue = document.querySelector('.result-display');
let operator = '';
let queue = [0];    //First number in queue is 0 
let isDot = false; 
let countDot = 0; 

//Event button 
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('CLEAR'); 
const deleteBtn = document.getElementById('DELETE');
const dotBtn = document.getElementById('dot');

//Function 
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
    if (num2 === 0) {
        alert("You tried to divide by 0. Try again");
        document.location.reload(true);
    }
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

function deleteOperand() {
    let lastElement = queue[queue.length - 1]; 
    if (typeof(lastElement) === 'number') {
        if (!(lastElement.toString().includes('.'))){
            if (lastElement >= 0) { lastElement = Math.floor(lastElement / 10); }
            else { lastElement = Math.ceil(lastElement / 10); }            
        }
        else {
            lastElement = Number(lastElement.toString().slice(0, -1));
            if (!lastElement.toString().includes('.')) {
                isDot = false; 
                countDot = 0; 
            }
        }
        changeDisplayValue(lastElement);
        operateOnQueue(lastElement);
    }
    else {
        queue.pop();
    }
}

function changeDisplayValue(lastElement) {
    displayValue.textContent = lastElement;
}

function clearBoard() {
    queue.length = 0;
    operator = '';
    queue = [0];
    displayValue.textContent = 0; 
    isDot = false; 
    countDot = 0;
}

function addDot() {
    isDot = true;
    if (countDot < 1) {
        displayValue.textContent += '.';
    }
}

function equal() {
    if (queue.length < 3) {
        alert('Error - we need two operands for an operation.'); 
        document.location.reload(true);
    }
    const result = operate(queue[0], queue[1], queue[2]);
    displayValue.textContent = result; 
    queue.splice(0, 2); 
    queue[0] = result;
}

function operateOnQueue(lastElement) {
    queue.pop();
    queue.push(lastElement)
}


//Event button actual work 
dotBtn.addEventListener("click", addDot);
deleteBtn.addEventListener("click", deleteOperand);
clearBtn.addEventListener("click", clearBoard);
equalBtn.addEventListener("click", equal);

//Main
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // If the value of button in number list: 
        let lastElement = queue[queue.length - 1]; 
        if (button.textContent in numList) {
            if (isDot === false) {
                if (typeof(lastElement) === 'number' && queue.length === 1) {
                    if (lastElement >= 0) {
                        lastElement = lastElement * 10 + Number(button.textContent);
                    }
                    else {
                        lastElement = Math.ceil(lastElement * 10) - Number(button.textContent);
                    }
                    displayValue.textContent = lastElement; 
                    operateOnQueue(lastElement);
                }
                else {
                    if (typeof(lastElement) !== 'number'){
                        queue.push(0);
                        lastElement = queue[queue.length - 1];
                    }  
                    lastElement = lastElement * 10 + Number(button.textContent);
                    displayValue.textContent = lastElement; 
                    operateOnQueue(lastElement);
                }
            }
            else {
                if (typeof(lastElement) === 'number') {
                    if (countDot < 1) {
                        lastElement = lastElement.toString() + '.' + button.textContent; 
                        countDot += 1;
                    }
                    else {
                        lastElement = lastElement.toString() + button.textContent;
                    }
                    displayValue.textContent += button.textContent;
                    queue.pop();
                    queue.push(Number(lastElement));
                }
            }
        }
        else {
            if (button.textContent !== '=' && button.textContent !== 'CLEAR' 
                    && button.textContent != 'DELETE' && button.textContent != ".") {
                operator = button.textContent;
                if (typeof(queue[queue.length - 1]) === 'number' && queue.length == 1) {
                    queue.push(operator);
                }
                else if (typeof(queue[queue.length - 1]) === 'number' && queue.length > 2){
                    const result = operate(queue[0], queue[1], queue[2]);
                    displayValue.textContent = result; 
                    queue.splice(0, 2); 
                    queue[0] = result;
                    queue.push(operator);
                }
                isDot = false; 
                countDot = 0;
            }
        }
        //For debugging
        console.log(queue);
}
    )
});