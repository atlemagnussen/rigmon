'use strict';

document.addEventListener("DOMContentLoaded", function() {

    var btnRefresh = document.getElementById("btnRefresh");
    var textAreaOutput = document.getElementById("output");
    btnRefresh.addEventListener("click", function() {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", "api");
        oReq.send();
    });

    function reqListener() {
        if (this.responseText) {
            showMessage(this.responseText);
        }
    }
    function showMessage(msg) {
        textAreaOutput.value += "\n" + msg;
    }
    let ws;
    function initWs() {
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
    }
    setTimeout(initWs, 2000);

    var loaded = "Loaded! " + new Date();
    showMessage(loaded);
    console.log(loaded);
});
