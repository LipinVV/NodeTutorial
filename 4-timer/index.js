const arguments = process.argv.slice(2)

const convertedArguments = arguments.map(argument => +argument.replace(/[^0-9]+/g, ""))
const currentLength = convertedArguments.length

if(currentLength !== 3) {
    console.log(`Количество аргументов должно быть равно 3, сейчас ${currentLength}`)
    process.exit(1)
}

const hours = convertedArguments.at(0)
const minutes = convertedArguments.at(1)
const seconds = convertedArguments.at(2)

const hourValues = 3600
const minuteValue = 60
const convertingValue = 1000

const secondsToHMS = seconds => {
    const convertedSeconds = seconds / convertingValue

    const totalHours = Math.floor(convertedSeconds / hourValues);
    const totalMinutes = Math.floor((convertedSeconds % hourValues) / minuteValue);
    const totalSeconds = convertedSeconds % minuteValue;

    // в дальнейшем можно добавить правильный выбор падежей
    console.log(`Таймер сработает через ${totalHours} часов ${totalMinutes} минут ${totalSeconds} секунд`)
}


if(convertedArguments.length > 0) {
    const calculatedTimeGap = (hours * hourValues + minutes * minuteValue + seconds) * convertingValue
    secondsToHMS(calculatedTimeGap)

    setTimeout(() => {
        console.log('Таймер сработал')
    }, calculatedTimeGap)
}

