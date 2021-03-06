'use strict';

document.addEventListener("DOMContentLoaded", function() {
    var rest = new Rest(); // jshint ignore:line
    var contentDiv = document.getElementById("content");
    var btnRefresh = document.getElementById("btnRefresh");
    var btnConnect = document.getElementById("btnConnect");
    var btnConfig = document.getElementById("btnConfig");
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
    btnConfig.addEventListener("click", function() {
        getConfig();
    });
    btnRefresh.addEventListener("click", function() {
        getStatus();
    });
    contentDiv.addEventListener("dblclick", function() {
        getStatus();
    });
    function getConfig() {
        return rest.call("GET", "api/config")
        .then(function(data) {
            minersEl.setAttribute("config", data);
            return data;
        }, showMessage);
    }

    function getStatus() {
        return rest.call("GET", "api/status")
        .then(function(data) {
            minersEl.setAttribute("miners", data);
            return data;
        }, showMessage);
    }
    function showMessage(msg) {
        textAreaOutput.value += "\n" + msg;
        textAreaOutput.scrollTop = textAreaOutput.scrollHeight;
    }

    if(typeof(w) === "undefined") {
        w = new Worker("miner.worker.js");
    }
    w.onmessage = function(event){
        if (event.data && Array.isArray(event.data)) {
            var type = event.data[0];
            if (type === "data") {
                minersEl.setAttribute("miners", JSON.stringify(event.data[1]));
            } else if (type === "config") {
                minersEl.setAttribute("config", JSON.stringify(event.data[1]));
            } else {
                showMessage(event.data[1]);
            }
        } else {
            showMessage(event.data[1]);
        }
    };

    getConfig()
    .then(() => {
        showMessage("Loaded config");
        return getStatus();
    }).then(() => {
        showMessage("Loaded initial status");
    });

    var loaded = "Loaded client " + new Date();
    showMessage(loaded);
    console.log(loaded);
});
