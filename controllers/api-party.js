'use strict'

const express = require('express')
const router = express.Router()
const search = require('youtube-search')
const superagent = require('superagent')
const spotify = require('spotify')
require('dotenv').config()

var options = {
  maxResults: 10,
  key: process.env.YOUTUBE_KEY
}

function getSpotify (song, callback) {
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err)
    } else {
      if (!data.tracks.items.length) {
        callback(false)
      } else {
        callback(data.tracks.items[0])
      }
    }
  })
}

module.exports = {
  apiSpotifyYoutube: function (req, res, next) {
    let result = getSpotify(req.params.song, function (data) {
      if (!data) {
        res.send('not found')
      } else {
        var keyoutube = data.album.artists[0].name + '-' + data.name
        console.log(`=============================================${keyoutube}`)
        search(keyoutube, options, function (err, results) {
          if (err) return res.send(err)

          let arr = []
          for (let i = 0; i < results.length; i++) {
            if (results[i].kind === 'youtube#video') {
              arr.push(results[i])
            }
          }
          res.redirect(arr[1].link)
        })
      }
    })
  }
}
