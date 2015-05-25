'use strict';

document.addEventListener("DOMContentLoaded", function(event) { 
  
  var templates = require('./compiled/templates.js');
	
	var rendered = {};
	
	rendered.cat = templates.example({ text: 'meow' });
	document.getElementById('root').appendChild(rendered.cat);
	setInterval(function () { rendered.cat.update('text', 'mew'); }, 3000);
	  
});