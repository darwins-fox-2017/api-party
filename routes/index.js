var express = require('express');
var router = express.Router();
let imdb = require('imdb-api');
let search = require('youtube-search');


function getImdb(name, callback) {
    imdb.getReq({
        name: name
    }, (err, movie) => {
        callback(movie)
    })
}

router.post('/', function (req, res) {
    res.send(req.body.name)
});

router.get('/search/:parameter', function (req, res, next) {
    let opts = {
        maxResults: 5,
        key: 'AIzaSyB4yXjTrzbJgirwI6HIXrd4eYiNYDoT28A'
    };

    let output = getImdb(req.params.parameter, function (data) {
        //youtube
        search(`${req.params.parameter} trailer`, opts, function (err, results) {
            if (err) {
                res.render("index", {
                    movie: '',
                    youtube: ''
                })
            }
            res.render("index", {
                movie: data,
                youtube: results
            })
        });
    })
});

module.exports = router;
