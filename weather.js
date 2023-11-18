#!/usr/bin/env node
import { getArguments } from "./helpers/arguments.js"
import { printSuccess, printError, printWeather, printAlert } from "./services/log-service.js"
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from "./services/storage-service.js"
import { getIcon, getWeather } from "./services/api.service.js"

const saveLanguage = async language => {
    if(!language.length) {
        printError('Не выбран язык')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.language, language)
        printSuccess('Язык сохранён')
    } catch (error) {
        printError(error.message)
    }
}

const saveToken = async token => {
    if(!token.length) {
        printError('Не указан token')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранён')
    } catch (error) {
        printError(error.message)
    }
}

const saveLocation = async (value, identifier) => {
    if (!value.length) {
        printError(identifier ? 'Не указаны города' : 'Не указан город')
        return
    }

    if (value.length === 1 && identifier) {
        printError('Введите больше, чем 1 город')
        return
    }

    try {
        if(identifier) {
            await saveKeyValue(TOKEN_DICTIONARY.location, value, identifier)
            printSuccess('Города сохранены')
        }
        if(!identifier) {
            await saveKeyValue(TOKEN_DICTIONARY.location, value)
            printSuccess('Город сохранён')
        }
    } catch (e) {
        printError(e.message)
    }
}

const getForecast = async () => {
    try {
        const location = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.location)
        const weather = await getWeather(location)

        weather.map(singleForecast => {
            printWeather(singleForecast, getIcon(singleForecast.weather[0]?.icon))
        })

    } catch (error) {
        if (error?.response?.status === 404) {
            printError('Неверно указан город')
        } else if (error?.response?.status === 401) {
            printError('Неверно указан токен')
        } else {
            printError(error.message)
        }
    }
}

const initCLI = () => {
    const args = getArguments

    const functionsHash = {
        m: () => !args.s && Array.isArray(args.m) && saveLocation(args.m, true),
        s: () => {
            const  trimAfterComma = (value) => {
                if (typeof value === 'string') {
                    const commaIndex = value.indexOf(',')
                    if (commaIndex !== -1) {
                        return value.slice(0, commaIndex).trim()
                    }
                }
                return value
            }

           return saveLocation(trimAfterComma(args.s))
        },
        t: () => saveToken(args.t),
        l: () => saveLanguage(args.l),
    }

    if(args.s && args.m) {
        printAlert(`Вы указали и город и несколько городов. Сохранится только ${args.s}`)
    }

    Object.keys(args).forEach(arg => {
        if (functionsHash[arg]) {
            functionsHash[arg]()
        }
    })

    const noCommandRelatedToForecast = !args.m && !args.s && !args.h && (!args.t && args.t !== '') && (!args.l && args.l !== '')

    if(noCommandRelatedToForecast) {
        return getForecast()
    }
}

initCLI()