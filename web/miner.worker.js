/* web worker for miner*/
var miners = [];

var ws;
function initWs() {
    if (!ws || ws.readyState === ws.CLOSED) {
    ws = new WebSocket(`ws://${location.host}`);
        ws.onerror = () => {
            console.log('WebSocket error');
        };
        ws.onopen = () => {
            console.log('WebSocket connection established');
        };
        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
        ws.onmessage = (msg) => {
            try {
                var d = JSON.parse(msg.data);
                var current = miners.find(function(i) { return i.id === d.id; });
                if (!current) {
                    miners.push(d);
                } else {
                    var index = miners.indexOf(current);
                    miners.splice(index, 1);
                    miners.push(d);
                }
                postMessage(miners);// jshint ignore:line
            } catch(e) {
                postMessage(msg.data);// jshint ignore:line
            }
        };
    } else {
        console.log("web socket is already open. readyState=" + ws.readyState);
    }
}
onmessage = function(e) {// jshint ignore:line
    var cmd = e.data;
    if (cmd === "connect") {
        initWs();
    }
};
