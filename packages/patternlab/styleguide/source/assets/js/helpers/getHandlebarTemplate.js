Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

module.exports = function(name) {
  if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
      jQuery.ajax({
          url : ma.themePath + '/js/templates/' + name + '.html',
          success : function(data) {
              if (Handlebars.templates === undefined) {
                  Handlebars.templates = {};
              }
              Handlebars.templates[name] = Handlebars.compile(data);
          },
          async : false
      });
  }
  return Handlebars.templates[name];
};
