var controllers = require('./controllers');
var directives = require('./directives');
var services = require('./services');
var _ = require('underscore');

var components = angular.module("app.components", ['ng']);

_.each(controllers, function(controller, name){
  components.controller(name, controller);
});

_.each(directives, function(directive, name){
  components.directive(name, directive);
});

_.each(services, function(factory, name){
  components.factory(name,factory);
});

var app_ = angular.module("app", ['app.components','ngRoute']);

app_.config(function($routeProvider) {
  $routeProvider.when('/',{
    templateUrl:"views/main.view.html"
  });

  $routeProvider.otherwise({
    redirectTo: '/'
  });

})
