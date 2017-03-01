var LYQL = require('lyql');
var TelegramBot = require('telegrambot');
var api = new TelegramBot('310129702:AAHXig3BC7_agFCXoPJdhCf-iQUrjUSr9YM');

var options = {
  "Stocks": ["BRMS.JK"],
  // Price, Change, and Volume
  "Parameters": ["l84", "p43", "v53"]
};

var check = {
  "BRMS.JK" : "95.00"
}

var test = new LYQL(options, function(data){
  test = data['BRMS.JK']
  console.log(test.l84);
  if(test.l84 == '94.00') {
    api.sendMessage({ chat_id: 130776262, text: 'BRMS Breakout price' }, function (err, message) {
        if (err) throw err;
        console.log(message);
    });
  }
});

test.start();
