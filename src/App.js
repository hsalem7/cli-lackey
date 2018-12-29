const program = require('commander');
const Input = require('./../src/Tools/Input.js')

class App {
    constructor (commander = null) {
        this.setCommander(commander || program)
        this.commands = {}
    }

    setCommander (commander) {
        this.commander = commander
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
           let appCommand = this.commander.command(
               this.commands[command].name + ' ' + this.buildArgs(this.commands[command])
           )

            appCommand.description(this.commands[command].getDescription())

            if(this.commands[command].getAlias() != null) {
                appCommand.alias(this.commands[command].getAlias())
            }

            for(let option of this.commands[command].getOptionsKeys()) {
                appCommand.option('--' + option + ' <' + option + '>', this.commands[command].getHelp(option))
            }

            appCommand.action((args, options) => {
                let input = new Input(this.commands[command])
                input.setArgsValues(args)
                input.setOptionsValues(options)
                input.validateArgs()
                input.validateOptions()

                // TODO: check for required args
                // then throw exceptions when not found

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
