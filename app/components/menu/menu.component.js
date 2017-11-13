(function(angular) {
angular.module('menuModule').component('menu', {
    templateUrl: 'components/menu/menu.html',
    controller: ['$routeParams', function menuController() {
            this.menuItems = ['home', 'about'];
            this.active = 0;
            this.setActive = function(index) {
                this.active = index;
            };
            this.getIsActive = function(index) {
                return index === this.active;
            };
        }
    ]
});
})(window.angular);
