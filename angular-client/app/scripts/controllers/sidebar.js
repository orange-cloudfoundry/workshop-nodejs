'use strict';

/**
 * @ngdoc function
 * @name clientWorkshopApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the clientWorkshopApp
 */
angular.module('clientWorkshopApp')
    .controller('SidebarCtrl', function ($scope, $rootScope, $state, UserService, LoginService) {
        $scope.loadingFinished = true;
        $scope.authenticated = false;
        $scope.user = {
            name: ""
        };
        $scope.modalEntryError = {
            title: "",
            content: ""
        };
        $scope.disconnect = function () {
            LoginService.disconnect(function (isAuthenticated) {
                $scope.user = {};
                $scope.authenticated = isAuthenticated;
            });
        };
        $scope.signin = {
            user: "",
            password: ""
        };
        LoginService.userInfo(function (user) {
            $scope.user = user;
            $scope.authenticated = LoginService.isAuthenticated();
            $scope.loadingFinished = true;
        });
        $scope.login = function () {
            LoginService.login($scope.signin.user, $scope.signin.password
                , function () {
                    LoginService.userInfo(function (user) {
                        $scope.user = user;
                        $scope.authenticated = LoginService.isAuthenticated();
                    });

                }, function (err) {
                    $scope.modalEntryError.title = "Error during connection";
                    $scope.modalEntryError.content = err.message;
                    $("#modalEntryError").openModal();
                });
        };
    });
