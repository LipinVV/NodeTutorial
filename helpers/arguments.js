


const getArguments = (args) => {
    const prefix =  '-'
    const result = {}
    const usefulPart = args.slice(2)

    usefulPart.forEach((value, index, array) => {
        const secondElement = array[index + 1]
        const firstCondition = index === array.length - 1
        const secondCondition =secondElement &&  secondElement.charAt(0) !== prefix

        if(value.charAt(0) === prefix) {
            if(firstCondition || !secondCondition) {
                result[value.slice(1)] = true
            }

            if(secondCondition) {
                result[value.slice(1)] = secondElement
            }
        }
    })
    return result
}

export { getArguments }