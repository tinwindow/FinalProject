var app = angular.module("remedyApp");

  app.controller("remedyController", function($scope, $http, $location){
      var ailmenttitle = "Cramps";
      //var $scope.ailmentId = {};
    $http({
      method: 'GET',
      url: "/remedies",
      params: {
        ailment: 'Migraine',
        test: 'jjytjy'
      }
    }).then(function(response) {
            console.log(response.data);
            $scope.remedy = response.data;
        })

    var ailmentName = $location.search().ailment;
    console.log(ailmentName);


    //  $scope.selectedRemedy = remedyService.getRemedy();
  })
