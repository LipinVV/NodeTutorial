#!/usr/bin/env node
import { getArguments } from './helpers/arguments.js'
import { printSuccess , printError } from "./services/log-service.js"
import { saveKeyValue, getKeyValue } from "./services/storage-service.js"

const saveToken = async token => {
    try {
        await saveKeyValue('token', token)
        printSuccess('Токен сохранён')
    } catch (error) {
        printError(error.message)
    }
}

const initCLI = () => {
    const args = getArguments(process.argv)

    const hash = {
        help: 'h',
        save: 's',
        token: 't'
    }

    const helpTrigger = args[hash.help]
    const saveTrigger = args[hash.save]
    const token = args[hash.token]

    helpTrigger && printSuccess(helpTrigger)

    if(token) return saveToken(token)
}

initCLI()