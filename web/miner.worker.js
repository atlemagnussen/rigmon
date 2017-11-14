/* web worker for miner*/
var miners = [];

var ws;
function initWs() {
    if (!ws || ws.readyState === ws.CLOSED) {
    ws = new WebSocket(`ws://${location.host}`);
        ws.onerror = () => {
            postWsMessage('WebSocket error');
        };
        ws.onopen = () => {
            postWsMessage('WebSocket connection established');
        };
        ws.onclose = () => {
            postWsMessage('WebSocket connection closed');
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
                postMessage(['data',miners]);
            } catch(e) {
                postWsMessage(msg.data);
            }
        };
    } else {
        postWsMessage("web socket is already open. readyState=" + ws.readyState);
    }
}
function disconnectWs() {
    if (ws && ws.readyState === ws.OPEN) {
        ws.close();
    } else {
        postWsMessage("web socket is not open. readyState=" + ws.readyState);
    }
}
function postWsMessage(msg) {
    postMessage(['ws', msg]);
}
onmessage = function(e) {
    var cmd = e.data;
    if (cmd === "connect") {
        initWs();
    } else if (cmd === "close") {
        disconnectWs();
    }
};
