
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


    $routeProvider.otherwise({ //default page view is list of ailments you can click on. 
        redirectTo: "/home"
    });

  });
