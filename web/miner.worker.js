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
                var data = JSON.parse(msg.data);
                var key = data[0];
                if (key === "miner") {
                    var minerData = data[1];
                    var existing = miners.find(function(i) { return i.id === minerData.id; });
                    if (!existing) {
                        miners.push(minerData);
                    } else {
                        var index = miners.indexOf(existing);
                        miners.splice(index, 1);
                        miners.push(minerData);
                    }
                    postMessage(['data',miners]);
                } else if (key === "config") {
                    postMessage(['config',data[1]]);
                }

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
