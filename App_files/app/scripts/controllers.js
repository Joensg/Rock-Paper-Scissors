'use strict';

angular.module('rpsApp')
    
    .controller('GameController', ['$scope','gameFactory', function($scope, gameFactory) {
        $scope.count = 0;
        $scope.choices = gameFactory.getChoices();
        $scope.games = gameFactory.getGames();
        
        // Rock-paper-scissors Game function
        $scope.rps_game = function (userChoiceIndex) {
            gameFactory.getResult($scope, userChoiceIndex);
        };
    }])
;