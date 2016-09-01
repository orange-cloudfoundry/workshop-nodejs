'use strict';

/**
 * @ngdoc service
 * @name clientWorkshopApp.LoginService
 * @description
 * # LoginService
 * Service in the clientWorkshopApp.
 */
angular.module('clientWorkshopApp')
    .service('LoginService', function (UserService, Config, $rootScope, $http) {
        var isAuthenticated = false;
        var user = {};

        function LoginService() {

        }

        LoginService.prototype.isAuthenticated = function () {
            return isAuthenticated;
        };
        LoginService.prototype.userInfo = function (callbackSuccess, callbackError) {
            if (user.hasOwnProperty("name") && isAuthenticated) {
                if (callbackSuccess != undefined) {
                    callbackSuccess(user, {});
                }
                return;
            }
            var req = {
                method: 'GET',
                url: Config.backendUrl + '/authentication/userInfo'
            };
            $http(req).success(function (data, status) {
                user = data;
                isAuthenticated = true;
                if (callbackSuccess != undefined) {
                    callbackSuccess(data, status);
                }
            }).error(function (error, status) {
                isAuthenticated = false;
                if (callbackError != undefined) {
                    callbackError(error, status);
                }
            });
        };
        LoginService.prototype.login = function (user, password, callbackSuccess, callbackError) {
            var req = {
                method: 'POST',
                url: Config.backendUrl + '/authentication/login',
                data: {
                    "user": user,
                    "password": password
                }
            };
            $http(req).success(function (data, status) {
                user = data;
                isAuthenticated = true;
                if (callbackSuccess != undefined) {
                    callbackSuccess(isAuthenticated, data, status);
                }
            }).error(function (error, status) {
                isAuthenticated = false;
                if (callbackError != undefined) {
                    callbackError(error, status);
                }
            });
        };
        LoginService.prototype.disconnect = function (callbackSuccess, callbackError) {
            var req = {
                method: 'GET',
                url: Config.backendUrl + '/authentication/disconnect'
            };
            $http(req).success(function (data, status) {
                user = {};
                isAuthenticated = false;
                if (callbackSuccess != undefined) {
                    callbackSuccess(isAuthenticated, data, status);
                }
            }).error(function (error, status) {
                if (callbackError != undefined) {
                    callbackError(error, status);
                }
            });
        };
        return new LoginService();
    });
