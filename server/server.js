'use strict';

var http = require('http');
var path = require('path');
var express = require('express');
var domthingMiddleware = require('./domthing-middleware');
var browserify = require('browserify-middleware');
var sassMiddleware = require('node-sass-middleware');

var routes = require('./routing');

var app = express();
var server = http.createServer(app);

////////////////////////////////////////////////////////////////
//////////////////////// CONFIGURATION /////////////////////////

app.configure('development', function() {
  app.get('/javascript/compiled/bundle.js', domthingMiddleware({
    srcDir: path.resolve(__dirname, '../client/templates'),
    destPath: path.resolve(__dirname, '../client/javascript/compiled/templates.js'),
  }));
  app.get('/javascript/compiled/bundle.js', 
    browserify('../client/javascript/client.js'));
  app.use(sassMiddleware({
    src: path.resolve(__dirname, '../client/stylesheets'),
    dest: path.resolve(__dirname, '../client/stylesheets/compiled'),
    prefix: '/stylesheets/compiled'
  }));
  //app.use(express.logger());
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  // try using Passport (npm) for authentication
  //app.use(express.basicAuth('user', 'pass'));
  app.use(express.static(path.resolve(__dirname, '../client')));
  app.use(app.router);
});

routes.configRoutes(app, server);

////////////////////////////////////////////////////////////////
///////////////////////// START SERVER /////////////////////////

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");

console.log('process.env.IP: ' + process.env.IP);