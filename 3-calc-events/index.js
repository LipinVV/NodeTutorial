const { EventEmitter } = require('events');
const add = require('./operations/add')
const multiply = require('./operations/multiply')
const subtract = require('./operations/subtract')
const divide = require('./operations/divide')

const arguments = process.argv.slice(2)

const calculationEmitter = new EventEmitter()

const [firstValue, secondValue, operation] = arguments

// то, что требовалось
calculationEmitter.on('result', result => console.log(result))

calculationEmitter.on('add', (firstValue, secondValue) => {
    calculationEmitter.emit('result', add(firstValue, secondValue))
})
calculationEmitter.on('multiply', (firstValue, secondValue) => {
    calculationEmitter.emit('result', multiply(firstValue, secondValue))
})
calculationEmitter.on('subtract', (firstValue, secondValue) => {
    calculationEmitter.emit('result', subtract(firstValue, secondValue))
})
calculationEmitter.on('divide', (firstValue, secondValue) => {
    calculationEmitter.emit('result', divide(firstValue, secondValue))
})

calculationEmitter.emit(operation, firstValue, secondValue)


// то, как я это вижу:

// const opsDirectory = 'operations'
// const operationNames = ['add', 'multiply', 'subtract', 'divide']
//
// calculationEmitter.on('result', result => console.log(result))
//
// const operations = Object.values(operationNames).map(name => {
//         return {
//             [name]: require(`./${opsDirectory}/${name}`)
//         }
// }).at(0)
//
// calculationEmitter.on(operation, (first, second) => {
//     calculationEmitter.emit('result', operations[operation](first, second))
// })
//
// calculationEmitter.emit(operation, firstValue, secondValue)

