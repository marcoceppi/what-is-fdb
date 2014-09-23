var express = require('express')
  , app = express()
  , fdb = require('fdb').apiVersion(200)
  , dbfile = process.env['FDB_CLUSTER'] || null;

fdb.init();

var db = fdb.open()

app.use(function(req, res, next) {
  db.doTransaction(function(t, icb) {
    t.get('online', function(err, val) {
      if(err) return icb(err);

      if(!val) {
        val = 0;
      } else {
        val = parseInt(val.toString());
      }

      val++;

      t.set('online', val.toString());
      icb(null, val);
    });
  }, function(err, val) {
    if(!err) {
      console.log('New vistor, total: ' + val);
      next();
    }
  });
});

app.get('/', function(req, res) {
  db.set('yodawg', 'whatup');
  res.send('Hello World');
});

app.get('/add', function(req, res) {
  db.get('yodawg', function(err, v) {
    console.log(v.toString());
    res.send(200);
  });
});

var port = process.env['PORT'] || 3000
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
