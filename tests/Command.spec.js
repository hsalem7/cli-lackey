const Command = require('./../src/Command.js')

class Command1 extends Command {
    config () {
        return {
            signature: 'cmd {arg1} {--option1}'
        }
    }
}

let c1 = new Command1

test('can get signature', () => {
    expect(c1.getSignature()).toBe('cmd {arg1} {--option1}')
})

test('can get name', () => {
    expect(c1.name).toBe('cmd')
})

test('can get args', () => {
    expect(c1.args).toEqual(['arg1'])
})

test('can get options', () => {
    expect(c1.options).toEqual(['option1'])
})
