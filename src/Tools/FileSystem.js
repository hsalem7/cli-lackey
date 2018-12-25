const FileExistsError = require('./Errors/FileExistsError.js')
const FileNotFoundError = require('./Errors/FileNotFoundError.js')

class FileSystem {

    static putContent (path, content, recursive) {
        if(this.exists(path)) {
            return new FileExistsError('File exists')
        }

        try {
            if(recursive) {
                this.createDirectories(file)
            }

            fs.writeFileSync(path, content)
        } catch (error) {
            return new Error(error)
        }

        return true
    }

    static exists (file) {
        return fs.existsSync(file)
    }

    static getContent (file) {
        if(! this.exists(file)) {
            return new FileNotFoundError
        }

        try {
            return fs.readFileSync(file, 'utf8')
        } catch (error) {
            return null
        }
    }

    static fileDirExists (path) {
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
