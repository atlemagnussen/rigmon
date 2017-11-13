
angular.module('aboutModule').component('aboutView', {
    templateUrl: 'components/about/about.html',
    controller: ['$routeParams', function AboutViewController($routeParams) {
            this.hello = "Hello Electron";
            this.url = "http://electron.atom.io";
            // $routeParams.phoneId;
        }
    ]
});
