'use strict';

/**
 * @ngdoc service
 * @name clientWorkshopApp.Config
 * @description
 * # Config
 * Service in the clientWorkshopApp.
 */
angular.module('clientWorkshopApp')
    .service('Config', function () {
        return {
            backendUrl: "http://workshop-node.cf.ns.nd-paas.itn.ftgroup"
        };
    });
