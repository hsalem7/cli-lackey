const Command = require('./Command.js')
const FileSystem = require('./Tools/FileSystem.js')
const FileExistsError = require('./Errors/FileExistsError.js')

class GeneratorCommand extends Command {

    handle () {
        this.run()
    }

    getTemplate () {
        this.error('Generator command should override getTemplate() function to return the path of the template')
    }

    getReplacements () {
        this.error('Generator command should override getReplacements() function to return an object with key to replace and the value to replace with')
    }

    getPath () {
        this.error('Generator command should override getPath() function to return the path to save generated template to')
    }

    replaceValues (templateText, replacements) {
        for (let value in replacements) {
            let pattern = new RegExp('<' + value + '>', 'g')
            templateText = templateText.replace(pattern, replacements[value])
        }

        return templateText
    }

    run () {
        let template = FileSystem.getContent(this.getTemplate())
        let replacements = this.getReplacements()
        let path = this.getPath()

        this.info('### running: ' + this.name + ' ###')
        this.info('Creating ' + path)

        let fileText = this.replaceValues(template, replacements)
        try {
            FileSystem.putContent(path, fileText, true)
            this.info(path + ' created successfuly')
            this.info("##########################\n")
        } catch (error) {
            if(typeof error === typeof FileExistsError) {
                this.error('File exists')
            }
        }
    }
}

module.exports = GeneratorCommand
