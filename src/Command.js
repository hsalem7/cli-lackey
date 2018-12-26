const Log = require('./../src/Tools/Log.js')
const Parser = require('./../src/Tools/Parser.js')

class Command {

    constructor (logger = null, parser = null) {
        this.logger = logger || Log
        this.parser = parser || Parser
        this.init()
    }

    init () {
        let parser = new Parser()
        parser.parse(this.getSignature())

        this.name = parser.getName()
        this.args = parser.getArgs()
        this.optionalArgs = parser.getOptionalArgs()
        this.options = parser.getOptions()
    }

    getSignature () {
        return this.config().signature
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
