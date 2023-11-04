const { performance, PerformanceObserver } = require('perf_hooks')
const { Worker } = require('worker_threads')
const os = require('os')
const numCPUs = os.cpus().length
const pathToWorker = './worker-loop.js'
const { calculate } = require('./calculations')


const performanceHandler = new PerformanceObserver(entities => {
    entities.getEntries().forEach(entity => console.log(entity.name, entity.duration))
})

performanceHandler.observe({ entryTypes: [ 'measure' ] })

const calculateWithThreads = (entries) => {

    return new Promise((resolve) => {
        const workers = []
        const entryChunks = []
        const chunkSize = Math.ceil(entries.length / numCPUs)

        for (let item = 0; item < entries.length; item += chunkSize) {
            entryChunks.push(entries.slice(item, item + chunkSize))
        }

        for (const chunk of entryChunks) {
            performance.mark('worker started')
            const worker = new Worker(pathToWorker, {
                workerData: { entries: chunk }
            })
            workers.push(worker)
        }

        let completedWorkers  = 0

        for (const worker of workers) {
            worker.on('message', entries => {
                completedWorkers++
                performance.mark('worker ended')

                if (workers.length === completedWorkers) {
                    console.log('Все массивы обработаны')
                    resolve(entries)
                }
                performance.measure('with multiple threads', 'worker started', 'worker ended')
            })
        }
    })
}

const basicCalculations = (array) => {
    performance.mark('basic execution started')
    calculate(array)
    performance.mark('basic execution ended')
    performance.measure(' basic', 'basic execution started', 'basic execution ended')
}

const main = async () => {
    const limit = 300000
    const entries = Array.from({ length: limit }, (_, index) => index + 1)
    basicCalculations(entries)
    await calculateWithThreads(entries)
}

main()
