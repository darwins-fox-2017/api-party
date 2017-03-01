'use strict'
// const superagent = require('superagent')
// var spotify = require('spotify')
//
// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function (err, data) {
//   if (err) {
//     console.log('Error occurred: ' + err)
//     return
//   } else {
//     console.log(data.tracks.items[0])
//   }
    // Do something with 'data'
  // var songInfo = data.tracks.items[0]
  // var songResult = console.log(songInfo.artists[0].name)
  // console.log(songInfo.name)
  // console.log(songInfo.album.name)
  // console.log(songInfo.preview_url)
  // console.log(songInfo)
// })

var search = require('youtube-search')

var opts = {
  maxResults: 10,
  key: 'AIzaSyDXXB5GUiwjWNuZdPWsT1EMHN5j9If2m7o'
}

search('linkin park', opts, function (err, results) {
  if (err) return console.log(err)

  console.dir(results)
})

// key youtube : AIzaSyDXXB5GUiwjWNuZdPWsT1EMHN5j9If2m7o
