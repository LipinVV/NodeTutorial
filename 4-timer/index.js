const arguments = process.argv.slice(2)

const convertedArguments = arguments.map(argument => +argument.replace(/[^0-9]+/g, ""))
const [hours,  minutes, seconds] = convertedArguments
const currentLength = convertedArguments.length

if(currentLength !== 3) {
    console.log(`Количество аргументов должно быть равно 3, сейчас ${currentLength}`)
    process.exit(1)
}

const hourConvertingValue  = 3600
const minuteConvertingValue  = 60
const convertingValue = 1000

const totalCountdownInformer = seconds => {
    const convertedSeconds = seconds / convertingValue

    const totalHours = Math.floor(convertedSeconds / hourConvertingValue)
    const totalMinutes = Math.floor((convertedSeconds % hourConvertingValue) / minuteConvertingValue)
    const totalSeconds = convertedSeconds % minuteConvertingValue

    // в дальнейшем можно добавить правильный выбор падежей
    console.log(`Таймер сработает через ${totalHours} часов ${totalMinutes} минут ${totalSeconds} секунд`)
}


if(convertedArguments.length > 0) {
    const calculatedTimeGap = ((hours * hourConvertingValue) + (minutes * minuteConvertingValue) + seconds) * convertingValue
    totalCountdownInformer(calculatedTimeGap)

    setTimeout(() => {
        console.log('Таймер сработал')
    }, calculatedTimeGap)
}

