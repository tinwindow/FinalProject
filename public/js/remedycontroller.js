var app = angular.module("remedyApp");

  app.controller("remedyController", function($scope, $http, $location){

    var ailmentName = $location.search().ailment;
    console.log(ailmentName);

    var upVotes= $location.search().userupvotes;

    function upVote(){ //function should increment var by one, pass to SQL,
      var upVote = $location.search().userupvotes; {
        console.log(userupvotes);
      }
    }

    $scope.title = ailmentName;
    $scope.uservotes = upVotes;


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
