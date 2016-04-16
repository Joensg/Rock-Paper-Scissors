'use strict';

angular
    .module('rpsApp')
    .controller('GameController', ['$scope', 'gameFactory', function($scope, gameFactory) {
        $scope.count = 0;
        $scope.score = 0;
        $scope.totalgames = 0;
        $scope.wins = 0;
        $scope.losses = 0;
        $scope.ties = 0;

        $scope.choices = gameFactory.getChoices();

        gameFactory.getGames().query( // get games from server
            function(response) {
                $scope.games = response;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        gameFactory.getScore().query( //get score from server
            function(response) {
                $scope.score = response.score;
                $scope.totalgames = response.totalgames;
                $scope.wins = response.wins;
                $scope.losses = response.losses;
                $scope.ties = response.ties;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        // Rock-paper-scissors Game function
        $scope.rps_game = function(userChoiceIndex) {
            gameFactory.getResult($scope, userChoiceIndex);

            gameFactory.getGames().save($scope.game);
        };
    }]);
