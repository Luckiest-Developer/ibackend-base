// var mongoose = require('mongoose');
// var config = require('./config')

// mongoose.connect(config.MONGODB_CONNECTION_URL)


var express = require('express')
var app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000)
