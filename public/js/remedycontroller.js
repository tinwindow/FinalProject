var app = angular.module("remedyApp");

  app.controller("remedyController", function($scope, $http, $location){ //dep injecting $location service is what parses the URL in address bar and makes it available to your app.

    var ailmentName = $location.search().ailment; //using search method updates address bar in real time; referenced below in scope.title - because it's already pulling the ailment name, which is what we want to appear as our title.
    console.log(ailmentName);                 //location.search() without params is a GETTER. Returns an object containing all the query string params.



    $scope.upVote = function(id) {
      console.log("im clicked", id);
       var upVoteServer = ('/remedies/' + id + '/userupvotes')
      $http.put(upVoteServer).then(function success (response) {

      });
    };

    $scope.title = ailmentName; //using var created above to put Ailment as title on remedy view. 



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
