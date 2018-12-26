const program = require('commander');
const Input = require('./../src/Tools/Input.js')

class App {
    constructor (commander = null) {
        this.commander = commander || program
        this.commands = {}
    }

    register (command) {
        this.commands[command.name] = command
    }

    registerAll (commands) {
        for(let command of commands) {
            this.register(command)
        }
    }

    buildArgs (command) {
        return '[args...]'
    }

    init () {
        for(let command in this.commands) {
           let appCommand = this.commander.command(this.commands[command].name + ' ' + this.buildArgs(this.commands[command]))
            for(let option of this.commands[command].options) {
                appCommand.option('--' + option + ' <' + option + '>')
            }

            appCommand.action((args, options) => {
                let input = new Input(this.commands[command].args)
                input.setArgs(args)
                input.setOptions(options)

                this.commands[command].input = input
                this.commands[command].handle()
            })
        }
    }

    run () {
        this.init()
        this.commander.parse(process.argv);
    }

    static call (command, args, options) {
        let input = new Input(command.args)
        input.setArgs(args)
        input.setOptions(options)
        command.input = input
        command.handle()
    }



}

module.exports = App
