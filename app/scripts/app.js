var app = angular.module('myApp2', []);

app.controller('choicesCtrl', function($scope) {
    $scope.choices = ["rock", "paper", "scissors"];
    
    // Rock-paper-scissors Game function
    $scope.rps_game = function (userChoiceIndex) {
        //print a blank line to separate consecutive games
        $(".gamelog").append("<br>", "<span>New Game:</span>");
        //print out the message for the player's choice
        $(".gamelog").append("<br>", "<span>You selected: </span>", $scope.choices[userChoiceIndex], "<br>");
        //compute random guess for comp_number using Math.random()
        compChoiceIndex = Math.floor((Math.random() * 3));
        // print out the message for computer's choice
        $(".gamelog").append("<span>Computer selected: </span>", $scope.choices[compChoiceIndex]);
        // compute difference of comp_number and player_number modulo five
        difference = (userChoiceIndex - compChoiceIndex) % 5;
        // use if/elif/else to determine winner, print winner message
        if ((difference==1) || (difference==-2))
            $(".gamelog").append("<div>You won!</div>");
        else if ((difference==-1) || (difference==2))
            $(".gamelog").append("<div>Computer wins!</div>");
        else
            $(".gamelog").append("<div>You and the computer had a tie!</div>");
    }
});