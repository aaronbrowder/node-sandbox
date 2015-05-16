var http = require('http');
var path = require('path');
var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var handlebarsPrecompiler = require('handlebars-precompiler');

var router = express();
var server = http.createServer(router);

handlebarsPrecompiler.watchDir(
  path.resolve(__dirname, "client/templates"),
  path.resolve(__dirname, "client/javascript/templates.js"),
  ['handlebars', 'hbs']
);

router.use(sassMiddleware({
    src: path.resolve(__dirname, 'client/stylesheets'),
    dest: path.resolve(__dirname, 'client/stylesheets/compiled'),
    debug: true,
    prefix: '/stylesheets/compiled'
}));

router.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
