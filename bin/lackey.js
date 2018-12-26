#!/usr/bin/env node

const App = require('./../src/App.js')
const CreateCommand = require('./../examples/CreateCommand.js')

let app = new App

app.register(new CreateCommand)

app.run()
