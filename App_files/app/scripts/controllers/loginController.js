'use strict';

angular
    .module('rpsApp')
    .controller('LoginController', ['$scope', '$window', '$location', '$localStorage', 'loginFactory', function($scope, $window, $location, $localStorage, loginFactory) {

        $scope.reloadPage = function() {
            $window.location.reload();
        };

        $scope.isloggedin = function() {
            if ($localStorage.currentUser) { //data for current user exists
                return true;
            }
            return false;
        };

        // login function
        $scope.login = function() {

            $scope.loading = true;

            var requestdata = { username: $scope.username, password: $scope.password };

            //POST the login data
            loginFactory.login().save(requestdata,
                function(response) { //POST success
                    //data saved
                    $scope.loading = false;

                    // login successful if there's a token in the response
                    if (response.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: $scope.username, token: response.token };

                        // add jwt token to auth header for all future requests made by the client to the server
                        loginFactory.setAccessToken(response.token);

                        // redirect to homepage
                        $location.path('/');
                    }
                },
                function(err) { //POST error
                    $scope.loading = false;
                    $scope.message = "Error: " + err.status + " " + err.statusText;

                    $scope.error = 'Username or password is incorrect';
                });
        };

        $scope.logout = function() {

            $scope.loading = true;

            loginFactory.logout().get(
                function(response) { // GET success
                    $scope.loading = false;

                    $scope.statuscode = response.status;
                    $scope.statustext = response.statusText;

                    // remove user from local storage
                    delete $localStorage.currentUser;
                    console.log("goodbyeeee");

                    // clear token in header
                    var clearedtoken = "";
                    loginFactory.setAccessToken(clearedtoken);
                    //reload page to flush out logged_our user data
                    $scope.reloadPage();
                    // redirect to homepage
                    $location.path('/');
                },
                function(response) { // GET error
                    $scope.loading = false;
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        };

        $scope.register = function() {

            $scope.loading = true;

            var requestdata = { firstname: $scope.firstname, lastname: $scope.lastname, username: $scope.username, password: $scope.password };

            //POST the registration data
            loginFactory.register().save(requestdata,
                function(response) { //POST success
                    // registration successful
                    $scope.loading = false;
                    // redirect to login page
                    $location.path('/');
                    $scope.message = response.status;
                },
                function(err) { //POST error
                    $scope.loading = false;
                    $scope.message = "Error: " + err.status + " " + err.statusText;

                    $scope.error = 'Username or password is incorrect';
                });
        };

    }]);
