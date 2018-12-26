const program = require('commander');

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
                this.commands[command].handle()
            })
        }
    }
}

module.exports = App
