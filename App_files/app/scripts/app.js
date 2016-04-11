'use strict';

angular.module('rpsApp', ['ui.router', 'ui.bootstrap', 'ngResource'])
    .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    
    // route for the home page
        .state('app', {
            url:'/',
            views: {
                'header': {
                    templateUrl : 'views/header.html'
                },
                'content': {
                    templateUrl : 'views/home.html',
                    controller  : 'GameController'
                },
                'footer': {
                    templateUrl : 'views/footer.html',
                }
            }
        })
    
    // route for the game page
        .state('app.game', {
            url:'game',
            views: {
                'content@': {
                    templateUrl : 'views/game.html',
                    controller  : 'GameController'
                }
            }
        })
    
    // route for the gamelog page
        .state('app.gamelog', {
            url:'gamelog',
            views: {
                'content@': {
                    templateUrl : 'views/gamelog.html',
                    controller  : 'GameController'
                }
            }
        });
    
    $urlRouterProvider.otherwise('/');
});