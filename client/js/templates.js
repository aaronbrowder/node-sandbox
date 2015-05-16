(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['cat'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div>\n  The dog says \""
    + this.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper)))
    + "\"\n</div>";
},"useData":true});
templates['dog'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div>\n  The cat says: "
    + this.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n</div>";
},"useData":true});
})();
