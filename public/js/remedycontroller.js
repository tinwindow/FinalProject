var app = angular.module("remedyApp");

  app.controller("remedyController", function($scope, $http, $location){

    var ailmentName = $location.search().ailment;
    console.log(ailmentName);

    $scope.title = ailmentName; 

    $http({
      method: 'GET',
      url: "/remedies",
      params: {
        ailment: ailmentName

      }
    }).then(function success (response) {
            console.log(response.data);
            $scope.remedies = response.data;
        })





  })
