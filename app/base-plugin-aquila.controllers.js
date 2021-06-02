const BaseControllers = angular.module("aq.base-plugin-aquila.controllers", []);

BaseControllers.controller("BasePluginController", [
    "$scope",
    "$location",
    "$q",
    "toastService",
    function ($scope, $location, $q, toastService) {
        $scope.plugin = {
            nom: "Chirac",
            prenom: "Jacques",
            date: "29 novembre 1932"
        };
    }
]);
