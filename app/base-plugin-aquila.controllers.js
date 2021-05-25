const BaseControllers = angular.module('aq.base-plugin-aquila.controllers', []);

BaseControllers.controller('BasePluginController', ['$scope', '$http', '$location', '$q', 'toastService','SendBirthdayMails',
    function ($scope, $http, $location, $q, toastService, SendBirthdayMails) {
        $scope.tabActive = 'configTab';
        
        //TEMP
        $scope.mail = {Type : '', detail : {html : 'salut'}}
        

        $scope.onTabSelect = function (tabId) {
            if(tabId != "configTab"){
                $scope.tabActive = tabId;
            }else {
              $scope.tabActive = "configTab";
            }
        };

        $scope.configTab = {
            name          : 'Configuration',
            partialUse    : true,
            prefix        : 'BIRTHDAY_'
        };

        $scope.onChange = function (valueOfSwitch){
            console.log(valueOfSwitch);
        };

        $scope.save = function(isQuit){
            //save the configuration of the plugin
            $http.post('v2/modules/config', {
                test: 'test'
            }).then(function (response) {
                console.log(response);
            })
            if(isQuit){
                return $location.path(`/modules`);
            }
        };
        
        $http.post('/v2/modules/md', { 
            //read me
            moduleName: "base-plugin-aquila"
        }).then(function (response) {
            $scope.md = response.data.html
        });

        //INUTILE
        //SendBirthdayMails.send({}, function(response){
        //    $scope.thing = response;
        //});
    }
]);
