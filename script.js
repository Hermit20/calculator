let number1
let number2
let operand


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


console.log(add(1,2))

console.log(subtract(1,2))

console.log(multuply(1,2))

console.log(divde(1,2))

