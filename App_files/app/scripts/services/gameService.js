'use strict';

angular
    .module('rpsApp')
    .constant("baseURL", "http://ec2-52-56-244-250.eu-west-2.compute.amazonaws.com:8080/") //server IP address
    .factory('gameFactory', ['$resource', 'baseURL', '$localStorage', function($resource, baseURL, $localStorage) {

        var gamefac = {};

        if ($localStorage.currentUser) { // if token already exists
            gamefac.accessToken = $localStorage.currentUser.token;
        } else {
            gamefac.accessToken = "";
        }

        gamefac.getChoices = function() {
            var choices = ["rock", "paper", "scissors"];
            return choices;
        };

        gamefac.getGames = function() {
            return $resource(baseURL + "games/:id", null, {
                query: {
                    method: "GET",
                    isArray: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': gamefac.accessToken
                    }
                },
                save: {
                    method: "POST",
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': gamefac.accessToken
                    }
                },
                'update': { method: 'PUT' }
            });
        };


        gamefac.getScore = function() {
            return $resource(baseURL + "games/score/:id", null, {
                query: {
                    method: "GET",
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': gamefac.accessToken
                    }
                }
            });
        };

        gamefac.getResult = function($scope, userChoiceIndex) {

            // retrieve last game number if not first game
            if ($scope.games) { // if prev game exists
                if ($scope.games.length !== 0) {
                    var last_game_no = parseInt($scope.games[$scope.games.length - 1].number);
                    $scope.count = last_game_no;
                }
            } else {
                $scope.games = [];
                $scope.count = 0;
            }

            // keep track of game number
            $scope.count++;
            // initialize and reset previous game and winner data
            $scope.game = {};
            // build game object
            $scope.game = {
                number: $scope.count,
                playerChoice: userChoiceIndex
            };

            // push game object into games
            $scope.games.push($scope.game);
            return $scope.games;
        };

        return gamefac;
    }]);
