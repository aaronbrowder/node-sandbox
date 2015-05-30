'use strict';

var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');
var errorHandler = require('errorhandler');
var express = require('express');
var domthingMiddleware = require('./domthing-middleware');
var http = require('http');
var methodOverride = require('method-override');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
var serveStatic = require('serve-static');

var routes = require('./routing');

var app = express();
var server = http.createServer(app);

////////////////////////////////////////////////////////////////
//////////////////////// CONFIGURATION /////////////////////////

app.configure('development', function() {
  // Compile templates
  app.use(domthingMiddleware({
    targetUrl: '/javascript/compiled/bundle.js',
    templatesSrcDir: path.resolve(__dirname, '../client/templates'),
    templatesDestPath: path.resolve(__dirname, 
      '../client/javascript/compiled/templates.js'),
  }));
  // Browserify client js
  app.use('/javascript/compiled/bundle.js', 
    browserify('../client/javascript/client.js'));
  // Compile sass
  app.use(sassMiddleware({
    src: path.resolve(__dirname, '../client/stylesheets'),
    dest: path.resolve(__dirname, '../client/stylesheets/compiled'),
    prefix: '/stylesheets/compiled'
  }));
});

app.configure('production', function() {
});

app.configure(function() {
  app.use(errorHandler());
  app.use(bodyParser.json());
  app.use(methodOverride());
  // try using Passport (npm) for authentication
  app.use(serveStatic(path.resolve(__dirname, '../client')));
  routes.configRoutes(app, server);
});

////////////////////////////////////////////////////////////////
///////////////////////// START SERVER /////////////////////////

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");

console.log('process.env.IP: ' + process.env.IP);