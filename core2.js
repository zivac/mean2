var express = require('express');
var app = express();
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
