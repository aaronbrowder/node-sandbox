/*jslint
	browser: true, 	continue: true, devel: true,
	indent: 2, 		maxerr: 50, 	newcap: true,
	newcap: true,	nomen: true,	plusplus: true,
	regexp: true,	sloppy: true,	vars: false,
	white: true
*/

'use strict';

var http = require('http');
var express = require('express');
var socketIo = require('socket.io');
var fsHandle = require('fs');

var app = express();
var server = http.createServer(app);
var io = socketIo.listen(server);

var watchMap = {};
var countIndex = 0;

var setWatch = function(url_path, file_type) {
  console.log('setWatch called on ' + url_path);
  if (!watchMap[url_path]) {
    console.log('setting watch on ' + url_path);
    fsHandle.watchFile(url_path.slice(1), function(current, previous) {
      console.log('file accessed');
      if (current.mtime !== previous.mtime) {
        console.log('file changed');
        io.sockets.emit(file_type, url_path);
      }
    });
    watchMap[url_path] = true;
  }
};

var countUp = function() {
  countIndex++;
  console.log(countIndex);
  io.sockets.send(countIndex);
};

app.configure(function() {
  app.use(function(request, response, next) {
    if (request.url.indexOf('/javascript/' >= 0)) {
      setWatch(request.url, 'script');
    }
    else if (request.url.indexOf('/stylesheets/' >= 0)) {
      setWatch(request.url, 'stylesheet');
    }
    next();
  });
  app.use(express.static(__dirname + '/'));
});

app.get('/', function(request, response) {
  response.redirect('/socket.html');
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");