var app = angular.module("remedyApp", ["ngRoute"]);
//just initializing app and routing here!

app.directive('ailmentTitle', function(){
      return {
        restrict: "E",
        template: "<h1>{{title}}</h1>",
        replace: false
      };
  });
