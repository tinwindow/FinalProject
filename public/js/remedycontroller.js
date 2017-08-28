var app = angular.module("remedyApp");

  app.controller("remedyController", function($scope, $http){

     $scope.selectedRemedy = remedyService.getRemedy();
  })
