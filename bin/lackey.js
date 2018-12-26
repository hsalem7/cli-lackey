#!/usr/bin/env node

const App = require('./../src/App.js')
const CreateCommand = require('./../examples/CreateCommand.js')
const commands = require(process.cwd() + '/commands.js')

let app = new App

app.register(new CreateCommand)

app.registerAll(commands)

app.run()
