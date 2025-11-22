let number1
let number2
let operand

let displayContent = ""

const inputButtons = [...document.querySelectorAll('.inputButtons button')]
  .filter(btn => btn.textContent.trim() !== '=');

const clrBtn = document.querySelector('.clearButton')
const delBtn = document.querySelector('.delButton')

inputButtons.forEach((button) => {
    button.addEventListener("click", displayButton)
})
clrBtn.addEventListener("click", clear)
delBtn.addEventListener("click", del)


function add(number1 , number2){
    return number1 + number2
}


function subtract(number1 , number2){
    return number1 - number2
}

function multuply(number1 , number2){
    return number1 * number2
}


function divde(number1 , number2){
    return number1 / number2
}

function operate(number1,number2,operand){
    if(operand === "+"){
        add(number1 , number2)
    }
    else if(operand === "-"){
        subtract(number1 , number2)
    }
    else if(operand === "*"){
        multuply(number1 , number2)
    }
    else if(operand === "/"){
        divde(number1 , number2)
    }
}

function clear(){
    const display = document.querySelector('.display')
    display.textContent = 0
    displayContent = ""
}

function displayButton(e){
    const display = document.querySelector('.display')
    display.textContent = displayContent
    const value = e.target.textContent.trim()
    display.textContent += value
    displayContent += value
}

function del(){
    const display = document.querySelector('.display')
    displayContent = displayContent.slice(0,displayContent.length - 1)
    display.textContent = displayContent
    if(displayContent === ""){
        display.textContent = 0
    }
}
console.log(add(1,2))

console.log(subtract(1,2))

console.log(multuply(1,2))

console.log(divde(1,2))

