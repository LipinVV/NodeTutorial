let quantity = 0

const calculate = ({ entries }) => {
    for( let index = 0; index < entries.length; index++ ) {
        const condition = entries[index] % 3 === 0
        condition && quantity++
    }
    return quantity
}

module.exports = { calculate }