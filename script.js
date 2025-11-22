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



function add(num1 , num2){
    return num1 + num2
}


function subtract(num1 , num2){
    return num1 - num2
}

function multuply(num1 , num2){
    return num1 * num2
}


function divde(num1 , num2){
    if(num2 === 0){
        alert("C'mon man you can't divde by 0 :(")
        return
    }
    return num1 / num2
}

function operate(number1,number2,operand){
    if(operand === "+"){
        return add(number1 , number2)
    }
    else if(operand === "-"){
        return subtract(number1 , number2)
    }
    else if(operand === "×"){
        return multuply(number1 , number2)
    }
    else if(operand === "÷"){
        return divde(number1 , number2)
    }
}

function clear(){
    currDisplay.textContent = 0
    lastDisplay.textContent = ""
}

function displayButton(e){
    const value = e.target.textContent.trim()
    if(value === "." && disablepoint){
        return 
    }
    if((currDisplay.textContent === "0" && value != ".") || resetScreen){
        currDisplay.textContent = value
        resetScreen = false
    }
    else{
        currDisplay.textContent += value
    }

    if(resetLastScreen){
        lastDisplay.textContent = ""
        resetLastScreen = false
    }

    disableoperand = false
    if(value === "."){
        disablepoint = true
    }
    
}

function del(){
    currDisplay.textContent = currDisplay.textContent
    .toString()
    .slice(0, -1)
}
 
function evalNumber(e){
    if(disableoperand){
        return 
    }
    disableoperand = true
    const value = e.target.textContent.trim()
    const prevoper = lastDisplay.textContent.trim().split(" ")
    

    

    let temp = lastDisplay.textContent + " " + currDisplay.textContent
    let operation = temp.trim().split(" ")
   
   


    if(operation.length >= 3 || value === "="){
        let result = formatFloat(equals(operation))


        currDisplay.textContent = result
        if(value != "="){
            lastDisplay.textContent = result + " " + value
        }
        else{
            lastDisplay.textContent = temp + " " + value
            resetLastScreen = true
        }
    }
    else{
        lastDisplay.textContent = temp + " " + value
    }

    
    resetScreen = true
    disablepoint = false
}

function equals(operation){
    let num1 = parseFloat(operation[0]) 
    let num2 = parseFloat(operation[2])
    let op   = operation[1]
    return operate(num1,num2,op)
}

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