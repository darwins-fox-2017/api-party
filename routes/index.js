var express = require('express');
var router = express.Router();
var request = require('superagent');
require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/restaurant', function(req, res, next) {
  var data = []

  request
  .get('https://developers.zomato.com/api/v2.1/search?q='+req.query.q+'&count=1')
  .set('user-key', process.env.ZOMATO)
  .set('Accept', 'application/json')
  .end(function(err, response){
    // Calling the end function will send the request
    if(!err){


      request
      .get(`api.openweathermap.org/data/2.5/weather?lat=${JSON.parse(response.text).restaurants[0].restaurant.location.latitude}&lon=${JSON.parse(response.text).restaurants[0].restaurant.location.longitude}&APPID=${process.env.OW}`)
      .set('Accept', 'application/json')
      .end(function(err, resp){
        // Calling the end function will send the request
        if(!err){

      //     console.log(JSON.parse(response.text).restaurants[0].restaurant.name);
          res.send({
            restaurant: JSON.parse(response.text).restaurants[0].restaurant.name,
            address: JSON.parse(response.text).restaurants[0].restaurant.location.address,
            range_price: JSON.parse(response.text).restaurants[0].restaurant.average_cost_for_two,
            cuisines: JSON.parse(response.text).restaurants[0].restaurant.cuisines,
            weather: JSON.parse(resp.text).weather[0].description,
            temp: (JSON.parse(resp.text).main.temp)/10+" celcius"
          })
        }
      });
    }

  })


});

router.get('/weather', function(req,res,next){
  console.log(req.query.lat);
  console.log(req.query.lon);
  request
  .get(`api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&APPID=${process.env.OW}`)
  .set('Accept', 'application/json')
  .end(function(err, response){
    // Calling the end function will send the request
    if(!err){
      console.log(response);
      res.send(response.text)
    }
  });

})

module.exports = router;
