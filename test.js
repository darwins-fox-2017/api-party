var LYQL = require('lyql');
var TelegramBot = require('telegrambot');
var api = new TelegramBot('310129702:AAHXig3BC7_agFCXoPJdhCf-iQUrjUSr9YM');

var options = {
  "Stocks": ["BRMS.JK", "DOID.JK", "BWPT.JK", "ENRG.JK"],
  // Price, Change, and Volume
  "Parameters": ["l84", "p43", "v53"]
};

var check = [
  {stocks : "BRMS.JK", price : "95.00"},
  {stocks : "DOID.JK", price : "378.00"},
  {stocks : "TLKM.JK", price : "3870.00"},
  {stocks : "ENRG.JK", price : "50.00"}
]

var test = new LYQL(options, function(data){
  for(let i=0; i<check.length; i++) {
    if(data[check[i].stocks]) {
      if(data[check[i].stocks])
    }
  }
  // console.log(data);
  // brms = data['BRMS.JK']
  // console.log(test.l84);
  // if(brms.l84 == '94.00') {
  //   api.sendMessage({ chat_id: 130776262, text: 'BRMS Breakout price' }, function (err, message) {
  //       if (err) throw err;
  //       console.log(message);
  //   });
  // }
});

test.start();
