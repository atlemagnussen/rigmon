'use strict';

document.addEventListener("DOMContentLoaded", function() {

    var btnRefresh = document.getElementById("btnRefresh");
    var textAreaOutput = document.getElementById("output");
    btnRefresh.addEventListener("click", function(e) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", "api");
        oReq.send();
    });

    function reqListener(e) {
        if (this.responseText) {
            textAreaOutput.value += "\n" + this.responseText;
        }
    }

    var loaded = "Loaded! " + new Date();
    textAreaOutput.value += loaded;
    console.log(loaded);
});
