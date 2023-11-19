import chalk from 'chalk'

const { bgGreen, bgRed, bgCyan, bgYellow } = chalk

const WEATHER_DICTIONARY = {
    weather: ['Погода в городе', 'Weather in the city'],
    temperature: ['Температура', 'Temperature'],
    humidity: ['Влажность', 'Humidity'],
    windSpeed: ['Скорость ветра', 'Wind speed'],
    feelsLike: ['ощущается как', 'feels like']
}

const printError = (error) => {
    console.log(bgRed('Error: ') + ' ' + error)
}

const printAlert = (notification) => {
    console.log(bgCyan('Внимание: ') + ' ' + notification)
}

const printSuccess = (message) => {
    console.log(bgGreen('Success : ') + ' ' + message)
}

const getTranslation = (word, language) => {
    if (WEATHER_DICTIONARY.hasOwnProperty(word)) {
        if (language === 'ru') {
            return WEATHER_DICTIONARY[word][0]
        } else if (language === 'en') {
            return WEATHER_DICTIONARY[word][1]
        } else {
            printError('Язык не поддерживается')
        }
    }
}

const printWeather = (res, icon, language) => {
    console.log(
        `${bgYellow(getTranslation('weather', language))} Погода в городе ${res.name}
		${icon}  ${res.weather[0].description}
        ${getTranslation('temperature', language)}: ${res.main.temp} (${getTranslation('feelsLike', language)} ${res.main.feels_like})
        ${getTranslation('humidity', language)}: ${res.main.humidity}%
		${getTranslation('windSpeed', language)}: ${res.wind.speed}
		`.replace(/^\s+/gm, '')
    )
}

export { printError, printSuccess, printWeather, printAlert }