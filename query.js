var search = require('youtube-search');
var opts = {
    maxResults: 10,
    key: 'AIzaSyB4yXjTrzbJgirwI6HIXrd4eYiNYDoT28A'
};

search('narnia', opts, function (err, results) {
    if (err) return console.log(err);

    console.dir(results);
});
