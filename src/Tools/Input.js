class Input {

    constructor (argsKeys) {
        this.argsKeys = argsKeys
        this.args = {}
    }

    setArgs (args) {
        for(let arg in args) {
            this.args[this.argsKeys[arg]] = args[arg]
        }
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

    setOptions(options) {
        this.options = options
    }

    getOption (key) {
        if(this.hasOption(key)) {
            return this.options[key]
        }

        return null
    }
}

module.exports = Input
