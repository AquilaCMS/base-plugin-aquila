const BaseServices = angular.module('aq.base-plugin-aquila.services', ['ngResource']);

//INUTILE
BaseServices.factory('SendBirthdayMails', ['$resource', 
    function ($resource) {
        return $resource('/v2/base-plugin-aquila/:type', {}, {
            send : {method: 'POST', params: {type: 'sendBirthdayMails'}, isArray: false} 
        });
    }
]);