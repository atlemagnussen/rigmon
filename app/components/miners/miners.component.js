(function(angular) {
angular.module('minersModule').component("miners", {
    template: '<miner-details ng-repeat="m in $ctrl.miners" miner="m"></miner-details>',
    bindings: {
        miners: '<'
    },
    controller: function(){

    }
}).component("minerDetails", {
    templateUrl: 'components/miners/minerDetails.html',
    bindings: {
        miner: '<'
    },
    controller: function(){

    }
});
})(window.angular);
