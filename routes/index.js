var express = require('express');
var router = express.Router();
var OAuth = require('oauth');
require('dotenv').config()
var meetup = require('meetup-api');
var meetupObject = meetup({key: process.env.API_Key})

router.get('/', function(req, res, next) {
  meetupObject.getGroup({
      urlname: 'Drupal-Jakarta'
  }, function(err, resp) {
      if (err) {
          res.send('Found meetup error', err);
      }
      res.send(resp);
  });
});

// router.get('/', function(req, res, next) {
//   var OAuth2 = OAuth.OAuth2;
//      var twitterConsumerKey = process.env.Client_ID;
//      var twitterConsumerSecret = process.env.Client_Secret;
//      var oauth2 = new OAuth2(process.env.API_Key,
//        twitterConsumerSecret,
//        'https://api.meetup.com/',
//        null,
//        '2/categories',
//        null);
//      oauth2.getOAuthAccessToken(
//        '',
//        {'grant_type':'client_credentials'},
//        function (e, access_token, refresh_token, results){
//        console.log('bearer: ',e);
//        res.send(results)
//      });
// });

module.exports = router;
