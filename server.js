var express = require('express')
  , app = express()
  , fdb = require('fdb').apiVersion(200)
  , dbfile = process.env['FDB_CLUSTER'] || null
  , db = fdb.open()

app.get('/', function(req, res) {
  db.set('yodawg', 'whatup', function(w) {
    console.log(w);
    res.send('Hello World');
  });
});

app.get('/add', function(req, res) {
  db.get('yodawg', function(v) {
    console.log(v);
    res.send(200);
  });
});

var port = process.env['PORT'] || 3000
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
