'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

let index = require('./routes/index')
// let api_party = require('./routes/api_party')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api', index)
// app.use('/api/api-party', api_party)

app.listen(3000)

module.exports = app
