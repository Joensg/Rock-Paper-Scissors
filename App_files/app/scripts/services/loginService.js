'use strict';

angular
    .module('rpsApp')
    .constant("baseURL", "http://ec2-52-56-244-250.eu-west-2.compute.amazonaws.com:8080/") //server IP address
    .factory('loginFactory', ['$resource', 'baseURL', '$localStorage', function($resource, baseURL, $localStorage) {
        var loginfac = {};

        if ($localStorage.currentUser) {
            loginfac.accessToken = $localStorage.currentUser.token;
        } else {
            loginfac.accessToken = "";
        }

        loginfac.setAccessToken = function(accessToken) {
            loginfac.accessToken = accessToken;
            return;
        };

        loginfac.login = function() {
            return $resource(baseURL + "users/login", {}, {
                save: {
                    method: "POST",
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': loginfac.accessToken

                    }
                }
            });
        };

        loginfac.logout = function() {
            return $resource(baseURL + "users/logout", null, {
                get: {
                    method: "GET",
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': loginfac.accessToken
                    }
                }
            });
        };

        loginfac.register = function() {
            return $resource(baseURL + "users/register", {}, {
                save: {
                    method: "POST",
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': loginfac.accessToken

                    }
                }
            });
        };

        return loginfac;
    }]);
