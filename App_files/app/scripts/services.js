'use strict';

angular.module('rpsApp')
    .factory('gameFactory', function() {
    var games = [];
    var gamefac = {};
    
    gamefac.getChoices = function() {
        return ["rock", "paper", "scissors"];
    };
    
    gamefac.getGames = function(){
        return games;
    };
    
    gamefac.getGame = function (index) {
        return games[index];
    };
    
    gamefac.getResult = function($scope, userChoiceIndex) {
        
        // retrieve last game number if not first game
        if(games.length !== 0){
            var last_game_no = parseInt(games[games.length - 1].number);
            $scope.count = last_game_no;
        }

        // keep track of game number
        $scope.count++;
        // initialize and reset previous game and winner data
        var winner = "";
        var game = {};
        
        //compute random guess for comp_number using Math.random()
        var compChoiceIndex = Math.floor((Math.random() * 3));
        // compute difference of comp_number and player_number modulo five
        var difference = (userChoiceIndex - compChoiceIndex) % 5;
        
        // use if/elif/else to determine winner, print winner message
        if ((difference === 1) || (difference === -2)) {
            winner = "You won!";
        }
        else if ((difference === -1) || (difference === 2)) {
            winner = "Computer wins!";
        }
        else {
            winner = "You and the computer had a tie!";
        }
        
        // build game object
        game = {
            number: $scope.count,
            playerChoice: $scope.choices[userChoiceIndex],
            computerChoice: $scope.choices[compChoiceIndex],
            winner: winner
        };
        
        // push game object into games
        games.push(game);
        return;
    };
    
    return gamefac;
})
;
