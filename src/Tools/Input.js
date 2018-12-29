const MissingRequiredArgError = require('./../Errors/MissingRequiredArgError.js')
const MissingRequiredOptionError = require('./../Errors/MissingRequiredOptionError.js')

class Input {

    constructor (command) {
        this.command = command
        this.argsKeys = command.getArgsKeys()
        this.optionsKeys = command.getOptionsKeys()
        this.args = {}

        this.optionalArgs = []
        this.requiredOptions = []
    }

    setArgsValues (argsValues) {
        for(let arg in argsValues) {
            this.args[this.argsKeys[arg]] = argsValues[arg]
        }
    }

    setOptionsValues (options) {
        this.options = options
    }

    validateArgs () {
        for(let arg of this.argsKeys) {
            if(! this.hasArg(arg) && ! this.isOptionalArg(arg)) {
                throw new MissingRequiredArgError(`Missing required argument '${arg}'`)
            }
        }

        return true
    }

    validateOptions () {
        for(let option of this.optionsKeys) {
            if(! this.hasOption(option) && this.isRequiredOption(option)) {
                throw new MissingRequiredOptionError(`Missing required option '${option}'`)
            }
        }

        return true

    }

    isOptionalArg (arg) {
        return this.command.getOptionalArgs().indexOf(arg) >= 0
    }

    isRequiredOption (option) {
        return this.command.getRequiredOptions().indexOf(option) >= 0
    }

    hasArg (key) {
        return !! this.args[key]
    }

    hasOption (key) {
        return !! this.options[key]
    }

    getArg (key) {
        if(!! this.args[key]) {
            return this.args[key]
        }

        return null
    }

    getOption (key) {
        if(this.hasOption(key)) {
            return this.options[key]
        }

        return null
    }
}

module.exports = Input
