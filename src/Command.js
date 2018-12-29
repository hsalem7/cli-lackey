const Log = require('./../src/Tools/Log.js')
const Parser = require('./../src/Tools/Parser.js')

class Command {

    constructor (logger = null) {
        this.logger = logger || Log
        this.init()
    }

    init () {
        let parser = new Parser()
        parser.parse(this.getSignature())
        this.parser = parser
        this.name = this.getName()
    }

    getSignature () {
        return this.config().signature
    }

    getName () {
        return this.parser.getName()
    }

    getArgsKeys () {
        return this.parser.getArgs()
    }

    getOptionsKeys () {
        return this.parser.getOptions()
    }

    getRequiredOptions () {
        return this.parser.getRequiredOptions()
    }

    getOptionalArgs () {
        return this.parser.getOptionalArgs()
    }

    getHelp (arg) {
        if(!! this.config().help) {
            return this.config().help[arg] || ''
        }
    }

    getDescription () {
        return this.config().description || ''
    }

    getAlias () {
        return this.config().alias || null
    }

    info (...message) {
        this.logger.info(message)
    }

    error (...message) {
        this.logger.error(message)
    }

    warn (...message) {
        this.logger.warn(message)
    }
}

module.exports = Command
