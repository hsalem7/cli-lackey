const GeneratorCommand = require('./../src/GeneratorCommand.js')

class CreateCommand extends GeneratorCommand {

    config () {
        return {
            signature: 'create:command {name} {--dir!}',
            help: {
                dir: 'Directory of the file'
            },
            description: 'Creates a command file',
            alias: 'c:c'
        }
    } 

    getTemplate () {
        return process.cwd() + '/templates/commandTemplate.stub'
    }

    getReplacements () {
        return {
            commandName: this.input.getArg('name')
        }
    }

    getPath () {
        return this.input.getOption('dir') + '/' + this.input.getArg('name') + '.js'
    }
}

module.exports = CreateCommand
