const BaseRoutes = angular.module('aq.base-plugin-aquila.routes', ['ngRoute']);

BaseRoutes.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/base-plugin-config', {
                templateUrl : 'app/base-plugin-aquila/views/base-plugin-config.html',
                controller  : 'BasePluginController',
                resolve     : {
                    loggedin : checkLoggedin
                }
            });
    }
]);
