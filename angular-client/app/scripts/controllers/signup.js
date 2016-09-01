'use strict';

/**
 * @ngdoc function
 * @name clientWorkshopApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the clientWorkshopApp
 */
angular.module('clientWorkshopApp')
    .controller('SignupCtrl', function ($scope, $rootScope, $state, UserService) {
        $scope.modalEntry = {
            title: "",
            content: ""
        };
        $scope.user = new UserService();
        $scope.signup = function () {
            $scope.user.$save(function () {
                $scope.modalEntry.title = "You have been registered";
                $scope.modalEntry.content = "please login now";
                $("#modalEntry").openModal();
            }, function (err) {
                $scope.modalEntry.title = "Error " + err.status;
                $scope.modalEntry.content = err.data.message;
                $("#modalEntry").openModal();
            });
        }
    });
