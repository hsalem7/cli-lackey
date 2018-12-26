const Log = require('./../src/Tools/Log.js')

class Command {

    constructor (logger = null) {
        if(logger === null) {
            this.logger = Log
        }
    }

    getSignature () {

    }

    info (...message) {
        this.logger.info(...message)
    }

    error (message) {
        this.logger.error(...message)
    }

    warn (message) {
        this.logger.warn(...message)
    }
}

module.exports = Command
