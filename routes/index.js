'use strict'
const express = require('express')
const router = express.Router()
const search = require('youtube-search')
const superagent = require('superagent')
const spotify = require('spotify')
// const controllers = require('../controllers/api_party')

var options = {
  maxResults: 10,
  key: 'AIzaSyDXXB5GUiwjWNuZdPWsT1EMHN5j9If2m7o'
}

router.get('/:song', function (req, res, next) {
  let result = getSpotify(req.params.song, function (data) {
    search(data, options, function (err, results) {
      if (err) return res.send(err)

      let arr = []
      for (let i = 0; i < results.length; i++) {
        if (results[i].kind === 'youtube#video') {
          arr.push(results[i])
        }
      }
      res.send({
        dataSpotify: data,
        dataYoutube: arr.link
      })
      // res.redirect(results[1].link)
    })
  })
})

function getSpotify (song, callback) {
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err)
      return
    } else {
      // console.log(data.tracks.items[0])
      callback(data.tracks.items[0])
    }
      // Do something with 'data'
    // var songInfo = data.tracks.items[0]
    // var songResult = console.log(songInfo.artists[0].name)
    // console.log(songInfo.name)
    // console.log(songInfo.album.name)
    // console.log(songInfo.preview_url)
    // console.log(songInfo)
  })
}

// key youtube : AIzaSyDXXB5GUiwjWNuZdPWsT1EMHN5j9If2m7o
// `${req.body.keyWord}`

module.exports = router
