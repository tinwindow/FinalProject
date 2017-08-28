var app = angular.module("remedyApp");

  app.controller("remedyController", function($scope, $http, $location){

    var ailmentName = $location.search().ailment;
    console.log(ailmentName);

    //  $scope.selectedRemedy = remedyService.getRemedy();
  })
