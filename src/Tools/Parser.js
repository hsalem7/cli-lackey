class Parser {

    parse (input) {
        this.input = input
        this.matches = input.match(/\{\s*(.*?)\s*\}/g) || []

        this.args = this.parseArgs(this.matches).args
        this.options = this.parseArgs(this.matches).options
        this.optionalArgs = this.parseArgs(this.matches).optionalArgs
    }

    parseArgs (matches) {
        let args = []
        let options = []
        let optionalArgs = []

        for(let arg of matches) {
            if(this.isOption(arg)) {
                options.push(this.cleanStr(arg))
            } else {
                if(this.isOptional(arg)) {
                    optionalArgs.push(this.cleanStr(arg))
                } else {
                    args.push(this.cleanStr(arg))
                }
            }
        }

        return {
            args: args,
            optionalArgs: optionalArgs,
            options: options
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

    isOptional (arg) {
        return arg.indexOf('?') > 0
    }

    isOption (arg) {
        return arg.indexOf('--') >= 0
    }

    // should be cleaner
    cleanStr (str) {
        return str.replace('{', '').replace('}', '').replace('--', '').replace('?', '')
    }
}

module.exports = Parser
