import yargs from 'yargs'

const COMMANDS_HASH = {
    s: 'city',
    t: 'token',
    h: 'help',
    l: 'language',
    m: 'multipleCities'
}

const hashKeys = Object.keys(COMMANDS_HASH)
const args = yargs(process.argv.slice(2))

args
    // .usage('Usage: $0 <command> [options]') - тут можно смотреть файл исполнения
    .options({
        's': {
            alias: 'city',
            describe: 'Укажите город',
            type: 'string',
        },
        't': {
            alias: 'token',
            describe: 'Токен для работы с API прогноза погоды',
            type: 'string',
        },
        'h': {
            alias: 'help',
            describe: 'Вывести справку',
            type: 'boolean',
        },
        'l': {
            alias: 'language',
            describe: 'Язык для вывода: ru/en',
            type: 'string',
        },
        'm': {
            alias: 'multipleCities',
            describe: 'Укажите несколько городов',
            type: 'array',
        },
    })
    .group(hashKeys, 'Возможные опции утилиты:')
    .version(false)
    .strict()
    .wrap(null)
    // .help(false) // Не показывать справку при использовании -h, если хочется вернуть свой личный метод -h
    .epilog('Для дополнительной информации: https://github.com/LipinVV')
    .exitProcess(false)
    .argv


args.updateStrings({
    'Show help': 'Вывести справку',
});

const getArguments = args.argv;

export { getArguments }
