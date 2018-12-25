const colors = require('colors')

class Log {

    static error (...message) {
        return this.message('error', message)
    }

    static warn (...message) {
        return this.message('warn', message)
    }

    static info (...message) {
        return this.message('info', message)
    }

    static message (type, messages) {
        if('error' === type) {
            messages = this.setMessagesColor(messages, 'red')
            console.log(...messages)
        } else if('warn' === type) {
            messages = this.setMessagesColor(messages, 'yellow')
            console.log(...messages)
        } else if('info' === type) {
            messages = this.setMessagesColor(messages, 'green')
            console.log(...messages)
        }
    }

    static setMessagesColor(messages, color) {
        let coloredMessages = []

        for(let message of messages) {
            coloredMessages.push(this.setMessageColor(message, color))
        }

        return coloredMessages
    }

    static setMessageColor(message, color) {
        if(!! colors[color]) {
            return colors[color](message)
        }

        return message
    }
}

module.exports = Log
