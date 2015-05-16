/*global $, Handlebars */

var client = (function () {

	var initModule = function ($root) {
		var catHtml = Handlebars.templates.cat({ text: 'meow' });
		var dogHtml = Handlebars.templates.dog({ text: 'woof' });
	  $root.html(catHtml).append(dogHtml);
	};
	
	return { 
	  initModule: initModule 
	};
}());