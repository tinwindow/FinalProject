var app = angular.module("remedyApp");

  app.controller("remedyController", function($scope, $http, $location){

    var ailmentName = $location.search().ailment;
    console.log(ailmentName);
    //$http.get("/api/remedies").then(function(response) {
            //console.log(response.data);
            //$scope.remedies = response.data;
        //})

    //  $scope.selectedRemedy = remedyService.getRemedy();
  })
