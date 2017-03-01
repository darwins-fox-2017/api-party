var express = require('express');
var router = express.Router();
var OAuth = require('oauth');
var billboard = require("billboard-top-100").getChart;
var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'TLGmM57uOhQn8Xhqf2IZ3LwRa',
    '0uEgTaPmGp0uhIWLVLWs9K1jIfK34afN9bihD4f21ZcA9hYg6p',
    '1.0A',
    null,
    'HMAC-SHA1'
  );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tweet/:q', function(req, res){

oauth.get(
    `https://api.twitter.com/1.1/search/tweets.json?q=${req.params.q}`,
    '836421347693645827-s5iFfii3RW8Y79m8t1MEMQUyOZjRCyh', //test user token
    'zBGzr4ABkxqK6UzQdWmN1ysD92gQZ44V10w5FLSjE5Ome', //test user secret
    function (e, data, respon){
      if (e) console.error(e);
      // console.log(require('util').inspect(data));

      res.json({data:data})
    });
})
router.post('/update', function(req, res){
// res.send('hello')
  oauth.post(
    `https://api.twitter.com/1.1/statuses/update.json?status=${req.body.q}`,
    '836421347693645827-s5iFfii3RW8Y79m8t1MEMQUyOZjRCyh', //test user token
    'zBGzr4ABkxqK6UzQdWmN1ysD92gQZ44V10w5FLSjE5Ome', //test user secret
    req.body.q,
    'text',
    function (e, data, respon){
      if (e) console.error(e);
      res.send(JSON.parse(data))
  });
})
router.post('/billboard', function(req, res){
  // res.send("tess")
  billboard('hot-100', function(songs, err){
    if (err) console.log(err);
    var tweet = `Top of of billboard 100 today is ${songs[0].artist} - ${songs[0].title}`
    oauth.post(
      `https://api.twitter.com/1.1/statuses/update.json?status=${tweet}`,
      '836421347693645827-s5iFfii3RW8Y79m8t1MEMQUyOZjRCyh', //test user token
      'zBGzr4ABkxqK6UzQdWmN1ysD92gQZ44V10w5FLSjE5Ome', //test user secret
      req.body.q,
      'text',
      function (e, data, respon){
        if (e) console.error(e);
        res.json({data : data})
        res.send(JSON.parse(data))
    });

    // console.log(songs); //prints array of top 100 songs
    // console.log(songs[3]); //prints song with rank: 4
    // console.log(songs[0].title); //prints title of top song
    // console.log(songs[0].artist); //prints artist of top songs
    // console.log(songs[0].rank) //prints rank of top song (1)
    // console.log(songs[0].cover) //prints URL for Billboard cover image of top song
  });
})

module.exports = router;
