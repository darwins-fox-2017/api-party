var express = require('express');
var router = express.Router();
require('dotenv').config()

var OAuth = require('oauth');
router.post('/tweet', function(req, res, next) {
  var oauth = new OAuth.OAuth(
     'https://api.twitter.com/oauth/request_token',
     'https://api.twitter.com/oauth/access_token',
     process.env.Consumer_Key,
     process.env.Application_Secret,
     '1.0A',
     null,
     'HMAC-SHA1'
   );
   var key = req.body.search
   oauth.get(
     'https://api.twitter.com/1.1/search/tweets.json?q='+key,
     process.env.User_Token, //test user token
     process.env.User_Secret, //test user secret
    //  function (e, data, res){ --> res change to cb (biar gak bentrok sama res di function pertama)
     function (e, data, cb){
       if (e) console.error(e);
       console.log(require('util').inspect(data));
      //  done();
      res.send(JSON.parse(data))
     });
});

var meetup = require('meetup-api');
var meetupObject = meetup({key: process.env.API_Key})
router.post('/meetup', function(req, res, next) {
  meetupObject.getGroup({
      urlname: req.body.url
  }, function(err, resp) {
      if (err) {
          res.send('Found meetup error', err);
      }
      res.send(resp);
  });
});

// var graph = require('fbgraph');
// var authUrl = graph.getOauthUrl({key: process.env.App_ID_FB})
// console.log(graph);
// console.log(authUrl);

// var searchOptions = {
//   q:     "drupal",
//   type:  "post"
// };
//
// router.get('/page', function(req, res, next) {
//   authUrl.search(searchOptions, function(err, data) {
//     console.log(err);
//     res.send(data); // {data: [{id: xxx, from: ...}, {id: xxx, from: ...}]}
//   });
// });

module.exports = router;
