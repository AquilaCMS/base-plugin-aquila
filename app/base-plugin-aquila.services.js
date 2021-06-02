const BaseServices = angular.module('aq.base-plugin-aquila.services', ['ngResource']);

BaseServices.factory('NameOfTheFactory', ['$resource',
    function ($resource) {
        return $resource('/v2/nameToIdentifyTheplugin', {}, {
            query : {method: 'POST', params: {}}
        });
    }
]);
