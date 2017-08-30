var app = angular.module("remedyApp");

  app.controller("remedyController", function($scope, $http, $location){ //dep injecting $location service is what parses the URL in address bar and makes it available to your app.

    var ailmentName = $location.search().ailment; //using search method (to get ailment from URL!)updates address bar in real time; referenced below in scope.title - because it's already pulling the ailment name, which is what we want to appear as our title.
    console.log(ailmentName);                 //location.search() without params is a GETTER. Returns an object containing all the query string params.
                                          //THIS IS WHERE WE GET AILMENT NAME FROM URL! Link puts ailment in URL, this line is getting ailment from URL.

                                              //FROM HERE WE GO TO HTTP.GET STATEMENT BELOW!
    $scope.upVote = function(id) {
      console.log("im clicked", id);
       var upVoteServer = ('/remedies/' + id + '/userupvotes')
      $http.put(upVoteServer).then(function success (response) {
        $http({ //this is where info is getting sent to server! //loads everything about remedy incl CURRENT VOTES!
          method: 'GET',
          url: "/remedies",
          params: {
            ailment: ailmentName //this is where the location info from URL is being sent to the server to the DB!

          }
        }).then(function success (response) {
                console.log(response.data);
                $scope.remedies = response.data; //here the data is returned and put onto scope
            })

      });
    };

    $scope.title = ailmentName; //using var created above to put Ailment as title on remedy view.



    $http({ //this is where info is getting sent to server! //loads everything about remedy incl CURRENT VOTES!
      method: 'GET',
      url: "/remedies",
      params: {
        ailment: ailmentName //this is where the location info from URL is being sent to the server to the DB!

      }
    }).then(function success (response) {
            console.log(response.data);
            $scope.remedies = response.data; //here the data is returned and put onto scope
        })



//CONTROLLER ---> SERVER ----> DATABASE!

  })
