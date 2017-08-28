
  var app = angular.module("remedyApp");

  app.config(function($routeProvider){
    $routeProvider.when("/home", {
      templateUrl: "partials/homepagelist.html",
      controller: "homeController"
    });

    $routeProvider.when("/remedy", {
      templateUrl: "partials/remedyinfo.html",
      controller: "remedyController"
    });


    $routeProvider.otherwise({
        redirectTo: "/home"
    });

  });
