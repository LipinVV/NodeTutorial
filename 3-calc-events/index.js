const { EventEmitter } = require('events');

const arguments = process.argv.slice(2)
const currentLength = arguments.length

if(currentLength !== 3) {
    console.log(`Количество аргументов должно быть равно 3, сейчас ${currentLength}`)
    process.exit(1)
}

const firstInteger = +arguments.at(0)
const secondInteger = +arguments.at(1)
const operation = arguments.at(2)

const operations = {
    add: require('./operations/add'),
    multiply: require('./operations/multiply'),
    subtract: require('./operations/subtract'),
    divide: require('./operations/divide'),
}

const calculationEmitter = new EventEmitter()

calculationEmitter.on(operation, (result) => console.log(result))

const calculate = (currentOperation, firstNumber, secondNumber) => {
     calculationEmitter.emit(currentOperation, ( operations[currentOperation](firstNumber, secondNumber)) )
}

calculate(operation, firstInteger, secondInteger)

