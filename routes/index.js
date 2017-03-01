var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var weather = require('weather-js');

// Options:
// search:     location name or zipcode
// degreeType: F or C

router.get('/search/:lokasi', function(req, res, next) {
  var GoogleNews, googleNews, track;

  GoogleNews = require('google-news');
  googleNews = new GoogleNews();
  var loc = req.params.lokasi

  track = `weather ${loc}`;

  googleNews.stream(track, function(stream) {
    var berita = []
    stream.on(GoogleNews.DATA, function(data) {
      berita.push(data.title)
      berita.push(data.link)
      // if(berita.length > 9) {
        weather.find({search: `${loc}, Indonesia`, degreeType: 'C'}, function(err, result) {
          if(err) return err;
          var dataResult = {
            weather: result,
            news: berita
          }
          // res.send(JSON.stringify(result, null, 2));
          // res.send(dataResult)
          return res.render('index',{data: dataResult, title: 'Weather News'})
          // res.send(berita)
        });

      // }
    });

    stream.on(GoogleNews.ERROR, function(error) {
      return res.render('Error Event received... ' + error);
    });
  });
});


module.exports = router;
