'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

let index = require('./routes/index')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api', index)

app.listen(3000)

module.exports = app
