
  var app = angular.module("remedyApp");

  app.config(function($routeProvider){
    $routeProvider.when("/home", {
      templateUrl: "partials/homepagelist.html",
      controller: "homeController"
    });

    $routeProvider.when("/remedies", {
      templateUrl: "partials/remedyinfo.html",
      controller: "remedyController"
    });


    $routeProvider.otherwise({
        redirectTo: "/home"
    });

  });
