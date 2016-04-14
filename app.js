/* global process */
/* global __dirname */
var express = require('express');
//var admin = require('sriracha-admin');
var app = express();
var port    =   process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {

  console.log('connected');

  socket.on('disconnect', function () {
      console.log('disconnected');
  });

  socket.on('vehicle', function(data) {
    console.log(data);
  })

  socket.on('driver', function(data) {
    console.log(data);
  })

});

app.use(express.static(__dirname + '/web'));

var router = express.Router();

router.use(function(req, res, next) {

  // continue doing what we were doing and go to the route
  next();
});

router.all('/*', function(req, res) {
  res.sendFile('web/index.html', { root : __dirname});
});

//require('./core2');

require('./core').init(function(err, coreRouter) {
  app.use('/api', coreRouter);
  //app.use('/admin', admin());
  app.use('/', router);
  server.listen(port, function () {
    console.log('App started on port '+port);
  });
});
