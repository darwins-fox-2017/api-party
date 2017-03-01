var express = require('express');
var router = express.Router();
var LYQL = require('lyql');
var TelegramBot = require('telegrambot');
var api = new TelegramBot('310129702:AAHXig3BC7_agFCXoPJdhCf-iQUrjUSr9YM');

var options = {
  "Stocks": ["BRMS.JK", "DOID.JK", "BWPT.JK", "ENRG.JK"],
  // Price, Change, and Volume
  "Parameters": ["l84", "p43", "v53"]
}

var check = {
  "BRMS.JK" : "95.00"
}

/* GET home page. */
router.get('/', function(req, res) {
  var test = new LYQL(options, function(data){
  console.log(data);
  res.render('index', {test: data})

});

test.start();
});

module.exports = router;
