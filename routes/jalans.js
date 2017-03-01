var express = require('express')
var router = express.Router()
var gmaps = require('@google/maps')
var unirest = require('unirest')
require('dotenv').config()

const gmapClient = gmaps.createClient({
  key: process.env.GMAP_KEY
})

function getZomato (err, response, legs) {
  return new Promise(function (resolve, reject) {
    var informations = []
    var counter = 0

    legs.steps.forEach(function (step, index) {
      // unirest.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${step.start_location.lat}&lon=${step.start_location.lng}&count=1`)
      //   .headers({'user-key': process.env.ZOMATO_KEY})
      //   .end(function (response) {
      //     var info = {}
      //     info.step = legs.steps[index]
      //     info.nearby_restaurants = response.body.nearby_restaurants
      //     console.log(response)
      //     // unirest.get('https://id.wikipedia.org/w/api.php?action=opensearch&search=Kebayoran Lama&format=json')
      //     //   .end(function (response) {
      //     //     res.send(response)
      //     //   })
      //     informations.push(info)
      //     if (informations.length === legs.steps.length) {
      //       resolve(informations)
      //     }
      //   })

      // unirest.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${step.start_location.lat},${step.start_location.lng}&radius=500&type=restaurant&key=AIzaSyCKjJ3U6MNzRlQJFjYAe3mhX7BekmtsHkk`)
      //   .end(function (response) {
      //     var info = {}
      //     info.step = legs.steps[index]
      //     info.nearby_restaurants = response
      //     info.lat = step.start_location.lat
      //     info.long = step.start_location.lng
      //     // console.log(response)
      //     // unirest.get('https://id.wikipedia.org/w/api.php?action=opensearch&search=Kebayoran Lama&format=json')
      //     //   .end(function (response) {
      //     //     res.send(response)
      //     //   })
      //     informations.push(info)
      //
      //     if (informations.length === legs.steps.length) {
      //       console.log(informations)
      //       resolve(informations)
      //     }
      //   })
      gmapClient.placesNearby({
        language: 'en',
        location: [step.start_location.lat, step.start_location.lng],
        radius: 200,
        opennow: true,
        type: 'restaurant'
      }, function (err, response) {
        // console.log(response)
        unirest.get('https://id.wikipedia.org/w/api.php?action=opensearch&search=Kebayoran Lama&format=json')
          .end(function (res) {
            var info = {}
            info.step = legs.steps[index]
            info.nearby_restaurants = response

            informations.push(info)
            if (informations.length === legs.steps.length) {
              console.log(informations)
              resolve(informations)
            }
          })
      })
    })
    if (err) {
      reject(err)
    }
  })
}

router.get('/search', function (req, res, next) {
  if (req.query.origin !== undefined) {
    gmapClient.directions({
      origin: req.query.origin,
      destination: req.query.destination,
      language: 'id',
      mode: 'driving'
    }, function (err, response) {
      if (!err) {
        var trackInformations = []
        var legs = response.json.routes[0].legs[0]
        getZomato(err, response, legs)
          .then(function (informations) {
            // console.log(informations.length)
            // console.log(informations[0].step)
            // console.log(informations)
            res.send(informations)
          // res.render('jalansinformation', {informations: informations})
          }).catch(function (err) {
          res.send(err.message)
        })
      }
    })
  } else {
    res.render('jalans')
  }
})

module.exports = router
