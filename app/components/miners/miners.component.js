(function(angular) {
angular.module('minersModule').component("miners", { 
    template: '<p>{{$ctrl.miners}}</p>',
    bindings: {
        miners: '<'
    },
    controller: function(){

    }
});
})(window.angular);
