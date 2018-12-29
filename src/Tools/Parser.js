class Parser {

    reset () {
        this.args = []
        this.options = []
        this.requiredOptions = []
        this.optionalArgs = []
    }

    parse (input) {
        this.reset()

        this.input = input
        this.matches = input.match(/\{\s*(.*?)\s*\}/g) || []
        this.parseArgs(this.matches)

        return this
    }

    parseArgs (matches) {
        for(let arg of matches) {
            if(this.isOption(arg)) {
                if(this.isRequiredOption(arg)) {
                    this.requiredOptions.push(this.cleanStr(arg))
                }
                this.options.push(this.cleanStr(arg))
            } else {
                if(this.isOptionalArg(arg)) {
                    this.optionalArgs.push(this.cleanStr(arg))
                }
                this.args.push(this.cleanStr(arg))
            }
        }
    }

    getName () {
        return this.input.split(/ +/g)[0]
    }

    getArgs () {
        return this.args
    }

    getOptionalArgs () {
        return this.optionalArgs
    }

    getOptions () {
        return this.options
    }

    getRequiredOptions () {
        return this.requiredOptions
    }

    isOptionalArg (arg) {
        return arg.indexOf('?') > 0
    }

    isOption (arg) {
        return arg.indexOf('--') >= 0
    }

    isRequiredOption (arg) {
        return arg.indexOf('!') >= 0
    }

    // should be cleaner
    cleanStr (str) {
        return str.replace('{', '').
            replace('}', '').
            replace('--', '').
            replace('?', '').
            replace('!', '').trim()
    }
}

module.exports = Parser
