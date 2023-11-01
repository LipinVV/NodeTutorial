module.exports = function divide(firstInteger, secondInteger) {
    if (secondInteger === 0) {
        console.log('На ноль делить нельзя')
        process.exit(1)
    }
    return firstInteger / secondInteger
}