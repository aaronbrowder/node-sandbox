var http = require('http');
var path = require('path');
var express = require('express');
var handlebarsPrecompiler = require('handlebars-precompiler');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

handlebarsPrecompiler.watchDir(
  path.resolve(__dirname, "client/templates"),
  path.resolve(__dirname, "client/js/templates.js"),
  ['handlebars']
);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
