const arguments = process.argv.slice(2)

const [firstValue, secondValue, operation] = arguments

const operations = {
    add: require('./operations/add'),
    multiply: require('./operations/multiply'),
    subtract: require('./operations/subtract'),
    divide: require('./operations/divide'),
}

const result = operations[operation](firstValue, secondValue)

console.log(result)