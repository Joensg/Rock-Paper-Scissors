'use strict';

angular
    .module('rpsApp')
    .constant("baseURL", "http://ec2-52-56-244-250.eu-west-2.compute.amazonaws.com:8080/") //server IP address
    .factory('scoreFactory', ['$resource', 'baseURL', '$localStorage', function($resource, baseURL, $localStorage) {
        var scorefac = {};

        if ($localStorage.currentUser) {
            scorefac.accessToken = $localStorage.currentUser.token;
        } else {
            scorefac.accessToken = "";
        }

        scorefac.getScores = function() {
            return $resource(baseURL + "scores", null, {
                query: {
                    method: "GET",
                    isArray: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': scorefac.accessToken
                    }
                }
            });
        };

        return scorefac;
    }]);
