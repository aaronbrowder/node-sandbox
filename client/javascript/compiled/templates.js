!function(){var a=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e.example=a({compiler:[6,">= 2.0.0-beta.1"],main:function(a,e,t,n){var s,l="function",i=e.helperMissing,c=this.escapeExpression;return'<div class="cat-container">\n  The cat says "<span class="cat-noise">'+c((s=null!=(s=e.text||(null!=a?a.text:a))?s:i,typeof s===l?s.call(a,{name:"text",hash:{},data:n}):s))+'</span>"\n</div>'},useData:!0})}();