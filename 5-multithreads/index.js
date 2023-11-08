const { performance, PerformanceObserver } = require('perf_hooks')
const { Worker } = require('worker_threads')
const { calculate } = require('./calculations')
const os = require('os')
const numCPUs = os.cpus().length

const pathToWorker = './worker-loop.js'

const performanceHandler = new PerformanceObserver(entities => {
    entities.getEntries().forEach(entity => console.log(entity.name, entity.duration))
})

performanceHandler.observe({ entryTypes: [ 'measure' ] })

const calculateWithThreads = async (entries) => {
        const entryChunks = []
        const chunkSize = Math.ceil(entries.length / numCPUs)

        for (let item = 0; item < entries.length; item += chunkSize) {
            entryChunks.push(entries.slice(item, item + chunkSize))
        }

        const workerHandler = (chunk) => {
            performance.mark('worker started')

            return new Promise((resolve) => {
                const worker = new Worker(pathToWorker, {
                    workerData: { entries: chunk }
                })
                worker.on('message', entries => {
                    resolve(entries)
                })
                performance.mark('worker ended')
                performance.measure('with multiple threads', 'worker started', 'worker ended')
            })
        }

        await Promise.all(entryChunks.map(chunk => workerHandler(chunk))).then(results => {
            console.log('Все промисы разрешены', results)
        })
}

const basicCalculations = (entries) => {
    performance.mark('basic execution started')
    calculate({ entries })
    performance.mark('basic execution ended')
    performance.measure(' basic', 'basic execution started', 'basic execution ended')
}

const main = async () => {
    const limit = 30_000_00
    const entries = Array.from({ length: limit }, (_, index) => index + 1)

    basicCalculations(entries)
    await calculateWithThreads(entries)
}

main()
