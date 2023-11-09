module.exports = function divide(firstValue, secondValue) {
    if (secondValue === 0) {
        console.log('На ноль делить нельзя')
        process.exit(1)
    }
    return Number(firstValue) / Number(secondValue)
}