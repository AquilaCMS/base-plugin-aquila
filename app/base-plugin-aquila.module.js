const basePlugin = {name: 'aq.base-plugin-aquila'};

angular.module(`${basePlugin.name}`, [
    `${basePlugin.name}.controllers`,
    `${basePlugin.name}.routes`,
    `${basePlugin.name}.services`// ,
    // `${basePlugin.name}.directives`
]);
// uncommented to use a decorator.
// Note that you need to have setup the service

angular.module('aq.dependencies').requires.push(`${basePlugin.name}`);

/*
angular.module('adminCatagenApp').config(['$provide', function ($provide) {
    $provide.decorator('HookPageProduct', [
        '$delegate',
        function myServiceDecorator($delegate) {
            $delegate = $delegate.concat([
                {
                    label              : 'Poids',
                    component_template :
                        '<div class="col-sm-10">'
                            + '<input type="number" ng-model="client.weight" class="form-control" />'
                        + '</div>'
                }
            ]);
            return $delegate;
        }
    ]);
}]);

*/