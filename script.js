let disableoperand = true
let disablepoint = false

let resetScreen = false
let resetLastScreen = false

const buttonList = ["0","1","2","3","4","5","6","7","8","9","."]
const operandList = ["+","-","×","÷"]
const inputButtons = [...document.querySelectorAll('.inputButtons button')].filter(btn => buttonList.includes(btn.textContent.trim()) )
console.log(inputButtons)
const operandButtons = document.querySelectorAll('.operand')
const clrBtn = document.querySelector('.clearButton')
const delBtn = document.querySelector('.delButton')
const eqlBtn = document.querySelector('.equalButton')
const currDisplay = document.querySelector('.currentDisplay')
const lastDisplay = document.querySelector('.lastDisplay')

// window.addEventListener('keydown', handleKeyboardInput)
inputButtons.forEach((button) => {
    button.addEventListener("click", displayButton)
}) 
operandButtons.forEach((button) =>{
    button.addEventListener("click", evalNumber)
})
clrBtn.addEventListener("click", clear)
delBtn.addEventListener("click", del)
eqlBtn.addEventListener("click", evalNumber)



// add: return the sum of two numbers
// inputs: num1 (Number), num2 (Number)
// output: Number — num1 + num2
function add(num1 , num2){
    return num1 + num2
}


// subtract: return the difference between two numbers (num1 - num2)
// inputs: num1 (Number), num2 (Number)
// output: Number — num1 - num2
function subtract(num1 , num2){
    return num1 - num2
}

// multuply: multiply two numbers and return the product
// NOTE: function name contains a small typo but behavior is correct
// inputs: num1 (Number), num2 (Number)
// output: Number — num1 * num2
function multuply(num1 , num2){
    return num1 * num2
}


// divde: divide num1 by num2 and return the quotient
// inputs: num1 (Number), num2 (Number)
// output: Number — num1 / num2
// Special case: if num2 is 0, show an alert and return undefined to avoid a divide-by-zero error
function divde(num1 , num2){
    // If the divisor is zero, stop and inform the user — division by zero is undefined
    if(num2 === 0){
        alert("C'mon man you can't divde by 0 :(")
        return
    }
    return num1 / num2
}


// operate: dispatch arithmetic operation based on the operand symbol
// inputs: number1 (Number), number2 (Number), operand (String: '+', '-', '×', '÷')
// output: Number — result of the corresponding arithmetic function
function operate(number1,number2,operand){
    // Check which operand was requested and call the corresponding helper
    if(operand === "+"){
        return add(number1 , number2)
    }
    // Handle subtraction
    else if(operand === "-"){
        return subtract(number1 , number2)
    }
    // Handle multiplication (× symbol)
    else if(operand === "×"){
        return multuply(number1 , number2)
    }
    // Handle division (÷ symbol)
    else if(operand === "÷"){
        return divde(number1 , number2)
    }
}

// clear: reset calculator displays to initial state
// side effects: updates DOM elements `currDisplay` and `lastDisplay`
function clear(){
    currDisplay.textContent = 0
    lastDisplay.textContent = ""
}

// displayButton: handle number / decimal button clicks and update the current display
// inputs: e (Event) — click event from a number/button element
// behavior: inserts the clicked character into the current display, manages decimal/reset flags
function displayButton(e){
    const value = e.target.textContent.trim()
    // If user tries to add a second decimal point when decimals are disabled, ignore
    if(value === "." && disablepoint){
        return 
    }
    // If the display currently shows '0' (fresh state) and the input is not '.',
    // or if resetScreen flag is set, replace the display with the new value.
    if((currDisplay.textContent === "0" && value != ".") || resetScreen){
        currDisplay.textContent = value
        resetScreen = false
    }
    else{
        // Otherwise append the new digit/point to the existing display
        currDisplay.textContent += value
    }

    // If last screen should be cleared (after pressing = previously), clear it now
    if(resetLastScreen){
        lastDisplay.textContent = ""
        resetLastScreen = false
    }

    // After entering a number, enabling operands again makes sense
    disableoperand = false
    // If the user entered a decimal point, disable further points until reset
    if(value === "."){
        disablepoint = true
    }
    
}

// del: remove the last character from the current display (backspace behavior)
function del(){
    currDisplay.textContent = currDisplay.textContent
    .toString()
    .slice(0, -1)
}
 
// evalNumber: handle operand and equals button clicks
// inputs: e (Event) — click event from an operand or equals button
// behavior: builds an operation from last/current displays, computes result when ready
function evalNumber(e){
    // If operand input is disabled (e.g., user hasn't entered a number), ignore
    if(disableoperand){
        return 
    }
    // Prevent further operand presses until a number is entered again
    disableoperand = true
    const value = e.target.textContent.trim()
    const prevoper = lastDisplay.textContent.trim().split(" ")
    
    let temp = lastDisplay.textContent + " " + currDisplay.textContent
    let operation = temp.trim().split(" ")
   
   

    // If we already have a full operation (num op num) or the user pressed '=' then evaluate
    if(operation.length >= 3 || value === "="){
        let result = formatFloat(equals(operation))


        currDisplay.textContent = result
        // If the input was another operand (not '='), show the result followed by that operand
        if(value != "="){
            lastDisplay.textContent = result + " " + value
        }
        else{
            // If '=' was pressed, append '=' to the last display and mark it to be cleared later
            lastDisplay.textContent = temp + " " + value
            resetLastScreen = true
        }
    }
    else{
        // Otherwise, just move current number to last display and show the operand
        lastDisplay.textContent = temp + " " + value
    }

    // Prepare to reset the current display on next number input and re-enable decimal point
    resetScreen = true
    disablepoint = false
}

// equals: parse the operation array into two numbers and an operand, then compute
// inputs: operation (Array) — expected shape ['num1', 'operand', 'num2']
// output: Number — result of operate(num1, num2, operand)
function equals(operation){
    let num1 = parseFloat(operation[0]) 
    let num2 = parseFloat(operation[2])
    let op   = operation[1]
    return operate(num1,num2,op)
}

// formatFloat: if the result is an integer, return it as-is; otherwise return with 2 decimal places
// input: num (Number)
// output: Number or String — formatted numeric result
function formatFloat(num) {
    return Number.isInteger(num) ? num : num.toFixed(2);
}

// function handleKeyboardInput(e) {
//   if ((e.key >= 0 && e.key <= 9) || e.key === '.') displayButton(e.key)
//   if (e.key === '=' || e.key === 'Enter' || e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
//     evalNumber(e.key)
//   if (e.key === 'Backspace') del()
//   if (e.key === 'Escape') clear()
// }