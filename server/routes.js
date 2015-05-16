/*jslint
	browser: true, 	continue: true, devel: true,
	indent: 2, 		maxerr: 50, 	newcap: true,
	newcap: true,	nomen: true,	plusplus: true,
	regexp: true,	sloppy: true,	vars: false,
	white: true
*/

'use strict';

var configRoutes = function(app, server) {
  
  app.get('/', function(request, response) {
    response.redirect('index.html');
  });
  
  app.all('/api/:obj_type/*?', function(request, response, next) {
    response.contentType('json');
    next();
  });
  
  app.get('/api/:obj_type/list', function(request, response) {
    response.send({ title: request.params.obj_type + ' list' });
  });
  
  app.post('/api/:obj_type/create', function(request, response) {
    response.send({ title: request.params.obj_type + ' created' });
  });
  
  app.get('/api/:obj_type/read/:id([0-9]+)', function(request, response) {
    response.send({ title:
      request.params.obj_type + ' with id ' +
      request.params.id + ' found' });
  });
  
  app.post('/api/:obj_type/update/:id([0-9]+)', function(request, response) {
    response.send({ title:
      request.params.obj_type + ' with id ' +
      request.params.id + ' updated' });
  });
  
  app.post('/api/:obj_type/delete/:id([0-9]+)', function(request, response) {
    response.send({ title:
      request.params.obj_type + ' with id ' +
      request.params.id + ' deleted' });
  });
  
};

module.exports = {
  configRoutes: configRoutes
};