/*global $, Handlebars */

var client = (function () {

	var initModule = function ($root) {
		var catHtml = Handlebars.templates.cat({ text: 'meow' });
		var dogHtml = Handlebars.templates.dog({ text: 'woof' });
		var cowHtml = Handlebars.templates.cow({ text: 'moo' });
	  $root.html(catHtml).append(dogHtml).append(cowHtml);
	};
	
	return { 
	  initModule: initModule 
	};
}());