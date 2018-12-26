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
}
