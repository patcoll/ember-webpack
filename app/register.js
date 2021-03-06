var Ember = require('ember');
var inflector = require('underscore.inflection');

module.exports = function(App) {
  App.initializer({
    name: 'app-register',
    initialize: function(container, application) {
      application.register('router:main', require('./router'));

      var typePlural, typeSingular, pathPart, relpath, objects, object, emberRoutePath, registerType;
      var m;

      var libs = require('./*/**/*.@(js|coffee)', { hash: 'path', ext: false });

      Ember.debug('-------------------------------');
      Ember.debug('REGISTER');
      Ember.debug('CLASSES');
      Ember.debug('-------------------------------');
      for (relpath in libs) {
        m = relpath.match(/^\.\/([^\/]+)\//);
        if (!m || !m[1]) {
          continue;
        }
        typePlural = m[1];
        typeSingular = inflector.singularize(typePlural);
        objects = libs[typeSingular];

        pathPart = './'+typePlural+'/';

        object = libs[relpath];
        emberRoutePath = relpath.replace(pathPart, '').replace('/', '.');
        registerType = typeSingular+':'+emberRoutePath;
        Ember.debug(registerType);
        Ember.debug(object);
        application.register(registerType, object);
      }

      Ember.debug('-------------------------------');
      Ember.debug('TEMPLATES');

      var templates = require('./templates/**/*.@(hbs|handlebars)', { hash: 'path', ext: true });
      for (relpath in templates) {
        m = relpath.match(/^\.\/([^\/]+)\//);
        if (!m || !m[1]) {
          continue;
        }
        typePlural = m[1];
        typeSingular = inflector.singularize(typePlural);

        pathPart = './'+typePlural+'/';

        object = templates[relpath];
        var extloc = relpath.lastIndexOf('.');
        relpath = relpath.slice(0, extloc);
        emberRoutePath = relpath.replace(pathPart, '').slice(0, extloc).replace('/', '.');
        registerType = typeSingular+':'+emberRoutePath;
        Ember.debug(registerType, object);
        application.register(registerType, object);
      }

      Ember.debug('-------------------------------');
    }
  });
};
