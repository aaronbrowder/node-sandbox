/*global $, Handlebars */

window.client = (function () {

	var initModule = function ($root) {
		var catHtml = Handlebars.templates.example({ text: 'meow' });
	  $root.html(catHtml);
	};
	
	return { 
	  initModule: initModule 
	};
}());