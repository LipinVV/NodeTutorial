const { EventEmitter } = require('events')
const arguments = process.argv.slice(2)

const calculationEmitter = new EventEmitter()

const [firstValue, secondValue, operation] = arguments

const operations = {
    add: require('./operations/add'),
    multiply: require('./operations/multiply'),
    subtract: require('./operations/subtract'),
    divide: require('./operations/divide'),
}

calculationEmitter.on('result', result => console.log(result))

Object.keys(operations).map(operation => {
    calculationEmitter.on(operation, (firstValue, secondValue) => {
        calculationEmitter.emit('result', operations[operation](firstValue, secondValue))
    })
})

calculationEmitter.emit(operation, firstValue, secondValue)


// мой начальный вариант:

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

