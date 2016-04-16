'use strict';

angular
    .module('rpsApp')
    .controller('LeaderboardController', ['$scope', 'scoreFactory', function($scope, scoreFactory) {
        scoreFactory.getScores().query( //get scores of all the users from server
            function(response) {
                $scope.scores = response;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    }]);
