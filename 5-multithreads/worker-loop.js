const { parentPort, workerData } = require('worker_threads')
const { calculate } = require('./calculations')

parentPort.postMessage(calculate(workerData))