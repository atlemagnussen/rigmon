(function(angular) {
angular.module('homeModule').component('homeView', {
    templateUrl: 'components/home/home.html',
    controller: ['$routeParams', function() {
        var items = [];
        Object.defineProperty(this, 'items', {
            get: function() {
                return items;
            },
            set: function(newVal) {
                items = newVal;
                console.log('setter');
            }
        });

        this.$onInit = function() {
            this.items.rig2 = {
                "version": "12.6 - ZEC",
                "runningMinutes": "11929",
                "totalHash": "1133;50437;185",
                "detailHash": [
                    "290",
                    "280",
                    "281",
                    "281"
                ],
                "totalHashSecondary": "0;0;0",
                "detailHashSecondary": [
                    "off",
                    "off",
                    "off",
                    "off"
                ],
                "tempSpeed": [
                    "78",
                    "22",
                    "80",
                    "22",
                    "81",
                    "22",
                    "82",
                    "42"
                ],
                "miningPool": "eu.zenmine.pro:9999",
                "invalidShares": [
                    "0",
                    "515",
                    "0",
                    "0"
                ]
            };
        };

        this.setNewRigData = function(d) {
            var its = angular.copy(this.items);
            var current = its.find(function(i) { return i.id === d.id; });
            if (!current) {
                this.items.push(d);
            } else {
                var index = its.indexOf(current);
                this.items.splice(index, 1);
                this.items.push(d);
            }
        };

        let ws;
        this.initWs = function() {
            if (!ws || ws.readyState === ws.CLOSED) {
            ws = new WebSocket(`ws://${location.host}`);
                ws.onerror = () => {
                    showMessage('WebSocket error');
                };
                ws.onopen = () => {
                    showMessage('WebSocket connection established');
                };
                ws.onclose = () => {
                    showMessage('WebSocket connection closed');
                };
                ws.onmessage = (msg) => {
                    // showMessage(msg.data);
                    try {
                        var d = JSON.parse(msg.data);
                        this.setNewRigData(d);
                        showMessage(d.id + " update received");
                    } catch(e) {
                        showMessage(msg.data);
                    }
                };
            } else {
                showMessage("web socket is already open. readyState=" + ws.readyState);
            }
        };

        this.disconnectWs = function() {
            if (ws && ws.readyState === ws.OPEN) {
                ws.close();
            } else {
                showMessage("web socket is not open. readyState=" + ws.readyState);
            }
        };

        var textAreaOutput = document.getElementById("output");
        function showMessage(msg) {
            textAreaOutput.value += "\n" + msg;
            textAreaOutput.scrollTop = textAreaOutput.scrollHeight;
        }
    }]
})
.component("miners", {
    template: '<p>{{$ctrl.miners}}</p>',
    bindings: {
        miners: '<'
    },
    controller: function(){
        var ctrl = this;

        ctrl.update = function(prop, value) {
            ctrl.onUpdate({miners: ctrl.miners, prop: prop, value: value});
        };
    }
});
})(window.angular);
