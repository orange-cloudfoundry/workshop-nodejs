'use strict';

/**
 * @ngdoc service
 * @name clientWorkshopApp.UserService
 * @description
 * # UserService
 * Service in the clientWorkshopApp.
 */
angular.module('clientWorkshopApp')
    .service('UserService', function ($resource, Config) {
        return $resource(Config.backendUrl + '/users/:name', {name: '@name'}, {
            query: {method: 'get', isArray: false}
        });
    });
