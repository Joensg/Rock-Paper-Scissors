'use strict';

angular
    .module('rpsApp', ['ui.router', 'ui.bootstrap', 'ngMessages', 'ngResource', 'ngStorage'])
    .config(function($stateProvider, $urlRouterProvider) {
        // app routes
        $stateProvider
            .state('app', { // route for the home page
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html',
                        controller: 'LoginController'
                    },
                    'content': {
                        templateUrl: 'views/home.html',
                        controller: 'LoginController'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('app.game', { // route for the game page
                url: 'game',
                views: {
                    'content@': {
                        templateUrl: 'views/game.html',
                        controller: 'GameController'
                    }
                }
            })
            .state('app.gamelog', { // route for the gamelog page
                url: 'gamelog',
                views: {
                    'content@': {
                        templateUrl: 'views/gamelog.html',
                        controller: 'GameController'
                    }
                }
            })
            .state('app.leaderboard', { // route for the leaderboard page
                url: 'leaderboard',
                views: {
                    'content@': {
                        templateUrl: 'views/leaderboard.html',
                        controller: 'LeaderboardController'
                    }
                }
            })
            .state('app.login', { // route for the login page
                url: 'login',
                views: {
                    'content@': {
                        templateUrl: 'views/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('app.register', { // route for the register page
                url: 'register',
                views: {
                    'content@': {
                        templateUrl: 'views/register.html',
                        controller: 'LoginController'
                    }
                }
            });

        // default route
        $urlRouterProvider.otherwise('/');
    });
