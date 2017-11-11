'use strict';

document.addEventListener("DOMContentLoaded", function() {
    var rest = new Rest(); // jshint ignore:line
    var btnRefresh = document.getElementById("btnRefresh");
    var btnConnect = document.getElementById("btnConnect");
    var btnDisconnect = document.getElementById("btnDisconnect");
    var textAreaOutput = document.getElementById("output");
    btnConnect.addEventListener("click", function() {
        initWs();
    });
    btnDisconnect.addEventListener("click", function() {
        if (ws && ws.readyState === ws.OPEN) {
            ws.close();
        } else {
            showMessage("web socket is not open. readyState=" + ws.readyState);
        }
    });
    btnRefresh.addEventListener("click", function() {
        rest.call("GET", "api")
        .then(showMessage, showMessage);
    });

    function showMessage(msg) {
        textAreaOutput.value += "\n" + msg;
        textAreaOutput.scrollTop = textAreaOutput.scrollHeight
    }
    let ws;
    function initWs() {
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
                showMessage(msg.data);
            };
        } else {
            showMessage("web socket is already open. readyState=" + ws.readyState);
        }
    }
    // setTimeout(initWs, 2000);

    var loaded = "Loaded client " + new Date();
    showMessage(loaded);
    console.log(loaded);
});
