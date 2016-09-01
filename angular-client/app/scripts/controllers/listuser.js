'use strict';

/**
 * @ngdoc function
 * @name clientWorkshopApp.controller:ListuserCtrl
 * @description
 * # ListuserCtrl
 * Controller of the clientWorkshopApp
 */
angular.module('clientWorkshopApp')
    .controller('ListUserCtrl', function ($scope, UserService) {
        $scope.users = [];
        $scope.modalEntry = {
            title: "",
            content: ""
        };
        var apiUsers = UserService.query(function () {
            angular.forEach(apiUsers, function (value, key) {
                if (key.charAt(0) == "$") {
                    return;
                }
                $scope.users.push({
                    name: key,
                    password: key
                });
            });
        }, function (err) {
            $scope.modalEntry.title = "Error " + err.status;
            $scope.modalEntry.content = err.data.message;
            $("#modalEntry").openModal();
        });

    });
