import chalk from 'chalk'
import dedent from 'dedent-js'

const { bgGreen, bgRed, bgCyan, bgYellow } = chalk

const printError = (error) => {
    console.log(bgRed('Error: ') + ' ' + error)
}

const printAlert = (notification) => {
    console.log(bgCyan('Внимание: ') + ' ' + notification)
}

const printSuccess = (message) => {
    console.log(bgGreen('Success : ') + ' ' + message)
}

const printWeather = (res, icon) => {
    console.log(
        dedent`${bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${icon}  ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		`
    )
}

export { printError, printSuccess, printWeather, printAlert }