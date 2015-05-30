'use strict';

var db = require('./db');

var configRoutes = function(app, server) {
  
  app.get('/', function(request, response) {
    response.redirect('index.html');
  });
  
  app.all('/api/:objectType/*?', function(request, response, next) {
    response.contentType('json');
    next();
  });
  
  app.get('/api/:objectType/list', function(request, response) {
    db.list(request.params.objectType, 
      function(documents) {
         response.send(documents);
      });
  });
  
  app.post('/api/:objectType/create', function(request, response) {
    db.create(request.params.objectType, request.body, 
      function(results) {
        response.send(results);
      });
  });
  
  app.get('/api/:objectType/read/:id([0-9]+)', function(request, response) {
    db.read(request.params.objectType, request.params.id, 
      function(result) {
        response.send(result);
      });
  });
  
  app.post('/api/:objectType/update/:id([0-9]+)', function(request, response) {
    db.update(request.params.objectType, request.params.id, request.body, 
      function(result) {
        response.send(result);
      });
  });
  
  app.post('/api/:objectType/delete/:id([0-9]+)', function(request, response) {
    db.destroy(request.params.objectType, request.params.id, 
      function(result) {
        response.send(result);
      });
  });
  
};

module.exports = {
  configRoutes: configRoutes
};