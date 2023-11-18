import axios from 'axios'
import { getKeyValue, TOKEN_DICTIONARY } from "./storage-service.js"

const getIcon = (icon) => {
    const currentIconId = icon.slice(0, -1)
    const iconsHash = {
        '01': '☀',
        '02': '🌤️',
        '03': '☁',
        '04': '☁',
        '09': '🌧️',
        '10': '🌦️',
        '11': '🌩️',
        '13': '❄',
        '50': '🌫️'
    }
    return iconsHash[currentIconId]
}

const getWeather = async (location) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)
    const language = process.env.LANGUAGE ?? await getKeyValue(TOKEN_DICTIONARY.language)

    if (!token) {
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
    }

    const isMultipleLocations = Array.isArray(location) ? location : [location]

    const promises = isMultipleLocations.map(async (city) => {
        const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: token,
                lang: language ? language : 'ru',
                units: 'metric'
            }
        })

        return data
    })

    return Promise.all(promises)
}

export { getWeather, getIcon }