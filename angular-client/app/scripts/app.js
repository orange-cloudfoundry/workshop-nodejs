'use strict';

/**
 * @ngdoc overview
 * @name clientWorkshopApp
 * @description
 * # clientWorkshopApp
 *
 * Main module of the application.
 */

angular
    .module('clientWorkshopApp', [
        'ngAnimate',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.materialize',
        'angular-loading-bar',
        'cfp.loadingBarInterceptor'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('index', {
                url: "/",
                views: {
                    'sidebar': {
                        controller: 'SidebarCtrl',
                        templateUrl: 'views/sidebar.html'
                    },
                    'content': {
                        controller: 'MainCtrl',
                        templateUrl: 'views/main.html'
                    }
                }
            })
            .state('signup', {
                url: "/signup",
                views: {
                    'sidebar': {
                        controller: 'SidebarCtrl',
                        templateUrl: 'views/sidebar.html'
                    },
                    'content': {
                        controller: 'SignupCtrl',
                        templateUrl: 'views/signup.html'
                    }
                }
            })
            .state('listuser', {
                url: "/listuser",
                views: {
                    'sidebar': {
                        controller: 'SidebarCtrl',
                        templateUrl: 'views/sidebar.html'
                    },
                    'content': {
                        controller: 'ListUserCtrl',
                        templateUrl: 'views/listuser.html'
                    }
                }
            });

    });
