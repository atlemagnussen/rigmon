'use strict';

document.addEventListener("DOMContentLoaded", function() {
    var rest = new Rest(); // jshint ignore:line
    var btnRefresh = document.getElementById("btnRefresh");
    var btnConnect = document.getElementById("btnConnect");
    var btnDisconnect = document.getElementById("btnDisconnect");
    var textAreaOutput = document.getElementById("output");
    var minersEl = document.getElementById("miners");

    var w;
    btnConnect.addEventListener("click", function() {
        if (w) {
            w.postMessage('connect');
        } else {
            showMessage("no worker");
        }
    });
    btnDisconnect.addEventListener("click", function() {
        if (w) {
            w.postMessage('close');
        } else {
            showMessage("no worker");
        }
    });
    btnRefresh.addEventListener("click", function() {
        rest.call("GET", "api/config")
        .then(showMessage, showMessage);
    });

    function showMessage(msg) {
        textAreaOutput.value += "\n" + msg;
        textAreaOutput.scrollTop = textAreaOutput.scrollHeight;
    }

    function initMiners() {
        rest.call("GET", "api/config")
        .then(function(config) {
            var confString = JSON.stringify(config);
        }, showMessage);
    }

    if(typeof(w) === "undefined") {
        w = new Worker("miner.worker.js");
    }
    w.onmessage = function(event){
        if (event.data && Array.isArray(event.data)) {
            var type = event.data[0];
            if (type === "data") {
                minersEl.setAttribute("miners", JSON.stringify(event.data[1]));
            } else {
                showMessage(event.data[1]);
            }
        } else {
            showMessage(event.data[1]);
        }
    };
    w.postMessage('connect');

    var loaded = "Loaded client " + new Date();
    showMessage(loaded);
    console.log(loaded);
});
