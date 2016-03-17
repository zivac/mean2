/* global process */
/* global __dirname */
var express = require('express');
var admin = require('sriracha-admin');
var app = express();
var port    =   process.env.PORT || 3000;

app.use(express.static(__dirname + '/web'));

var router = express.Router();

router.use(function(req, res, next) {

    // continue doing what we were doing and go to the route
    next();
});

router.all('/*', function(req, res) {
  res.sendFile('web/index.html', { root : __dirname});
});

require('./core').init(function(err, coreRouter) {
  app.use('/api', coreRouter);
  app.use('/admin', admin());
  app.use('/', router);
  app.listen(port, function () {
    console.log('App started on port '+port);
  });
});
