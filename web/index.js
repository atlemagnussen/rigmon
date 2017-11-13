'use strict';

document.addEventListener("DOMContentLoaded", function() {
    var rest = new Rest(); // jshint ignore:line
    var btnRefresh = document.getElementById("btnRefresh");
    var btnConnect = document.getElementById("btnConnect");
    var btnDisconnect = document.getElementById("btnDisconnect");
    var textAreaOutput = document.getElementById("output");
    var minersEl = document.getElementById("miners");
    btnConnect.addEventListener("click", function() {

    });
    btnDisconnect.addEventListener("click", function() {

    });
    btnRefresh.addEventListener("click", function() {
        rest.call("GET", "api")
        .then(showMessage, showMessage);
    });

    function showMessage(msg) {
        textAreaOutput.value += "\n" + msg;
        textAreaOutput.scrollTop = textAreaOutput.scrollHeight;
    }

    var w;
    if(typeof(w) === "undefined") {
        w = new Worker("miner.worker.js");
    }
    w.onmessage = function(event){
        if (event.data && Array.isArray(event.data)) {
            minersEl.setAttribute("miners", JSON.stringify(event.data));
        } else {
            showMessage(event.data);
        }
    };
    w.postMessage('connect');

    var loaded = "Loaded client " + new Date();
    showMessage(loaded);
    console.log(loaded);
});
