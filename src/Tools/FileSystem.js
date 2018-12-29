const fs = require('fs')
const path = require('path')

const FileExistsError = require('./../Errors/FileExistsError.js')
const FileNotFoundError = require('./../Errors/FileNotFoundError.js')

class FileSystem {

    static exists (file) {
        return fs.existsSync(file)
    }

    static putContent (file, content, recursive = false) {
        if(this.exists(file)) {
            throw new FileExistsError('File exists')
        }

        try {
            if(recursive) {
                this.createDirectories(file)
            }

            fs.writeFileSync(file, content)
        } catch (error) {
            throw new Error(error)
        }

        return true
    }

    static getContent (file) {
        if(! this.exists(file)) {
            throw new FileNotFoundError
        }

        try {
            return fs.readFileSync(file, 'utf8')
        } catch (error) {
            throw new Error(error)
        }
    }

    static deleteFile (file) {
        try {
            fs.unlinkSync(file)
        } catch (error) {
            console.log(error)
        }
    }

    static fileDirExists (file) {
        let directory = path.dirname(file)
        return fs.existsSync(directory)
    }

    static createDirectories (file) {
        let directory = path.dirname(file)
        let directories = directory.split(path.sep)
        let step = ''
        for (let dir of directories) {
            step = step + dir + '/'
            if(! fs.existsSync(step)) {
                fs.mkdirSync(step)
            }
        }
    }
}

module.exports = FileSystem
