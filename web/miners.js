/* miners components*/
"use strict";

class Miners extends HTMLElement {
    constructor() {
        super();
        this.miners = [];
    }
    static get observedAttributes() {return ['miners']; }
    connectedCallback() {
        console.log("connected");
        this.paragraph = document.createElement('p');

        this.miners = this.getAttribute('miners');

        //var shadow = this.createShadowRoot();

        this.update();

        this.appendChild(this.paragraph);
    }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        if (attributeName === 'miners') {
            this.miners = newValue;
        }
        this.update();
    }
    update() {
        this.paragraph.innerHTML = this.miners;
    }
}
customElements.define('my-miners', Miners);


//document.addEventListener("DOMContentLoaded", function(event) {
    // var w;
    // if(typeof(w) == "undefined") {
    //     w = new Worker("js/webworker.js");
    // }
    // w.onmessage = function(event){
    //     document.getElementById("myAvatar").setAttribute("username", event.data);
    // };
    //
    // document.getElementById('selectService').addEventListener('change', function() {
    //     document.getElementById("myAvatar").setAttribute("service", document.getElementById('selectService').value);
    // });
    //
    // document.getElementById('btnStop').addEventListener('click', function() {
    //     w.postMessage("kill");
    // });
//});
