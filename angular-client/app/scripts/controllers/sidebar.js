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
        $scope.loadingFinished = false;
        $scope.authenticated = false;
        $scope.user = {
            name: ""
        };
        $scope.modalEntryError = {
            title: "",
            content: ""
        };
        $scope.disconnect = function () {
            $scope.loadingFinished = false;
            LoginService.disconnect(function (isAuthenticated) {
                $scope.user = {};
                $scope.authenticated = isAuthenticated;
                $scope.loadingFinished = true;
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
        }, function () {
            $scope.loadingFinished = true;
        });
        $scope.login = function () {
            $scope.loadingFinished = false;
            LoginService.login($scope.signin.user, $scope.signin.password
                , function () {
                    LoginService.userInfo(function (user) {
                        $scope.user = user;
                        $scope.authenticated = LoginService.isAuthenticated();
                        $scope.loadingFinished = true;
                    });

                }, function (err) {
                    $scope.loadingFinished = true;
                    $scope.modalEntryError.title = "Error during connection";
                    $scope.modalEntryError.content = err.message;
                    $("#modalEntryError").openModal();
                });
        };
    });
