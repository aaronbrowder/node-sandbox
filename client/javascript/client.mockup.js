/*global $, Handlebars */

var client = (function () {

	var initModule = function ($root) {
		var catHtml = Handlebars.templates.cat({ text: 'meow' });
	  $root.html(catHtml);
	};
	
	return { 
	  initModule: initModule 
	};
}());