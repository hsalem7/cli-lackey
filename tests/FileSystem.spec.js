const FileSystem = require('../src/Tools/FileSystem.js')
const fs = require('fs')

deleteFile = (file) => {
    try {
        fs.unlinkSync(file)
    } catch (error) {
        console.log(error)
    }
}

test('can create file', () => {
    let path = './.__tmp.tmp'
    FileSystem.putContent(path, 'nothing')

    let exists = fs.existsSync(path)
    expect(exists).toBe(true)
    deleteFile(path)
})

test('can read file content', () => {
    let path = './.__tmp.tmp'
    let content = 'test'
    FileSystem.putContent(path, content)
    expect(FileSystem.getContent(path)).toBe(content)
    deleteFile(path)
})

test('can delete file', () => {
    let path = './.__tmp.tmp'
    try {
        fs.writeFileSync(path, 'nothing')
    } catch (error) {
        console.log(error)
    }

    FileSystem.deleteFile(path)
    let exists = fs.existsSync(path)
    expect(exists).toBe(false)
})
