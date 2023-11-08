import chalk from 'chalk'

const { bgGreen, bgRed, bgCyan } = chalk

const printError = (error) => {
    console.log(bgRed('Error: ') + ' ' + error)
}

const printSuccess = (message) => {
    console.log(bgGreen('Success : ') + ' ' + message)
}


const printHelp = (message) => {
    console.log(bgCyan('Help : ') + ' ' + message)
}

export { printError, printSuccess, printHelp }