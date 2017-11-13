(function(angular) {
    'use strict';
    angular.module('app').
    config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/home', {
            template: '<home-view></home-view>'
        }).
        when('/about', {
            template: '<about-view></about-view>'
        }).
        otherwise('/home');
        }
    ]);

    angular.module('app').directive('nagPrism', [function() {
    return {
        restrict: 'A',
        scope: {
            source: '@'
        },
        link: function(scope, element, attrs) {
            scope.$watch('source', function(v) {
                if(v) {
                    Prism.highlightElement(element.find("code")[0]);
                }
            });
        },
        template: "<code ng-bind='source'></code>"
    };
}]);
})(window.angular);
