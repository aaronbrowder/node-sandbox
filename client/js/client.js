/*global $, Handlebars */

var client = (function () {

	var initModule = function ($root) {
		var catHtml = Handlebars.templates.sample({ text: 'meow' });
		var dogHtml = Handlebars.templates.dimple({ text: 'woof' });
	  $root.html(catHtml).append(dogHtml);
	};
	
	return { 
	  initModule: initModule 
	};
}());